import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { BookOpen, Brain, TrendingUp, Shield } from "lucide-react";

export function EduAlertCard() {
  return (
    <CardContainer className="inter-var w-full">
      <CardBody className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 relative group/card hover:shadow-2xl hover:shadow-orange-500/[0.3] dark:hover:shadow-orange-500/[0.2] border border-orange-200 dark:border-orange-900/30 w-full h-auto rounded-3xl p-8">
        
        {/* Title */}
        <CardItem
          translateZ="50"
          className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Data-Driven Insights
        </CardItem>
        
        {/* Subtitle */}
        <CardItem
          as="p"
          translateZ="60"
          className="text-orange-600 dark:text-orange-400 text-base font-medium mb-6"
        >
          Powered by Machine Learning & LLMs
        </CardItem>

        {/* Visual Grid with Icons */}
        <CardItem translateZ="100" className="w-full mb-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-orange-200/50 dark:border-orange-900/20">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-2">
                <Brain className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                AI-Powered
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Smart predictions
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-orange-200/50 dark:border-orange-900/20">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Real-Time
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Live analytics
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-orange-200/50 dark:border-orange-900/20">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-2">
                <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Transparent
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Explainable AI
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-orange-200/50 dark:border-orange-900/20">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-2">
                <BookOpen className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Data Fusion
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Unified view
              </p>
            </div>
          </div>
        </CardItem>

        {/* Central Image/Graphic */}
        <CardItem translateZ="120" className="w-full mb-6">
          <div className="relative aspect-video bg-gradient-to-br from-orange-400/20 via-orange-500/30 to-orange-600/20 dark:from-orange-500/10 dark:via-orange-600/20 dark:to-orange-700/10 rounded-2xl overflow-hidden border border-orange-300/50 dark:border-orange-800/30">
            {/* Animated background circles */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-orange-400/20 dark:bg-orange-500/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-orange-500/20 dark:bg-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            
            {/* Central icon */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl rotate-6 group-hover/card:rotate-12 transition-transform duration-500">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Floating stats */}
            <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-orange-600 dark:text-orange-400 shadow-lg">
              95% Accuracy
            </div>
            <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-orange-600 dark:text-orange-400 shadow-lg">
              1000+ Students
            </div>
          </div>
        </CardItem>

        {/* Bottom Stats */}
        <div className="flex justify-between items-center gap-4">
          <CardItem
            translateZ={30}
            className="flex-1"
          >
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 border border-orange-200/50 dark:border-orange-900/20 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Early Detection</p>
              <p className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">95%</p>
            </div>
          </CardItem>
          
          <CardItem
            translateZ={30}
            className="flex-1"
          >
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 border border-orange-200/50 dark:border-orange-900/20 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Response Time</p>
              <p className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Real-time</p>
            </div>
          </CardItem>

          <CardItem
            translateZ={30}
            className="flex-1"
          >
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 border border-orange-200/50 dark:border-orange-900/20 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Monitored</p>
              <p className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">1000+</p>
            </div>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}