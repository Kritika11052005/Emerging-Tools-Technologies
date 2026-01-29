CREATE TABLE students (
    student_id VARCHAR(50) PRIMARY KEY,
    roll_number VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    class VARCHAR(20),
    section VARCHAR(10),
    department VARCHAR(50),
    enrollment_year INT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE attendance_records (
    attendance_id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) REFERENCES students(student_id),
    subject_code VARCHAR(20),
    period_start DATE,
    period_end DATE,
    classes_conducted INT,
    classes_attended INT,
    attendance_percentage DECIMAL(5,2),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE assessment_records (
    assessment_id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) REFERENCES students(student_id),
    subject_code VARCHAR(20),
    assessment_name VARCHAR(50),
    assessment_type VARCHAR(30),
    score_obtained DECIMAL(5,2),
    max_score DECIMAL(5,2),
    assessment_date DATE,
    weightage DECIMAL(3,2),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE subject_attempts (
    attempt_id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) REFERENCES students(student_id),
    subject_code VARCHAR(20),
    attempts_used INT,
    max_attempts_allowed INT,
    last_attempt_date DATE,
    status VARCHAR(20) CHECK (status IN ('ongoing', 'exhausted'))
);
CREATE TABLE fee_records (
    fee_record_id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) REFERENCES students(student_id),
    fee_type VARCHAR(30),
    amount_due DECIMAL(10,2),
    amount_paid DECIMAL(10,2),
    due_date DATE,
    payment_status VARCHAR(20) CHECK (payment_status IN ('paid', 'pending'))
);
CREATE TABLE risk_profiles (
    risk_profile_id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) REFERENCES students(student_id),

    attendance_risk BOOLEAN,
    performance_risk BOOLEAN,
    attempt_risk BOOLEAN,
    fee_risk BOOLEAN,

    risk_score INT,
    risk_category VARCHAR(10) CHECK (risk_category IN ('GREEN', 'YELLOW', 'RED')),
    last_evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE notification_logs (
    notification_id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) REFERENCES students(student_id),
    recipient_type VARCHAR(20) CHECK (recipient_type IN ('mentor', 'guardian')),
    risk_category VARCHAR(10),
    message_summary TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_status VARCHAR(20)
);
CREATE TABLE professors (
    professor_id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE subjects (
    subject_code VARCHAR(20) PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    department VARCHAR(50)
);
CREATE TABLE professor_subjects (
    professor_id VARCHAR(50) REFERENCES professors(professor_id),
    subject_code VARCHAR(20) REFERENCES subjects(subject_code),
    PRIMARY KEY (professor_id, subject_code)
);
CREATE TABLE student_subjects (
    student_id VARCHAR(50) REFERENCES students(student_id),
    subject_code VARCHAR(20) REFERENCES subjects(subject_code),
    PRIMARY KEY (student_id, subject_code)
);
ALTER TABLE attendance_records
ADD CONSTRAINT unique_attendance_entry
UNIQUE (student_id, subject_code, period_start, period_end);
-- ================================
-- Unified Student Profile View
-- ================================


CREATE OR REPLACE VIEW unified_student_profile AS
SELECT
    s.student_id,
    s.full_name,
    s.department,
    s.class,
    s.section,

    -- Attendance aggregation
    AVG(ar.attendance_percentage) AS avg_attendance_percentage,
    MIN(ar.attendance_percentage) AS min_attendance_percentage,

    -- Assessment aggregation
    AVG((a.score_obtained / a.max_score) * 100) AS avg_assessment_percentage,
    COUNT(a.assessment_id) AS total_assessments,

    -- Attempt aggregation
    MAX(sa.attempts_used) AS max_attempts_used,
    SUM(
        CASE
            WHEN sa.status = 'exhausted' THEN 1
            ELSE 0
        END
    ) AS exhausted_subjects_count

FROM students s
LEFT JOIN attendance_records ar
    ON s.student_id = ar.student_id
LEFT JOIN assessment_records a
    ON s.student_id = a.student_id
LEFT JOIN subject_attempts sa
    ON s.student_id = sa.student_id
GROUP BY
    s.student_id,
    s.full_name,
    s.department,
    s.class,
    s.section;
