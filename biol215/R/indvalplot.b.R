
# This file is a generated template, your changes will not be overwritten

indvalplotClass <- if (requireNamespace('jmvcore', quietly=TRUE)) R6::R6Class(
    "indvalplotClass",
    inherit = indvalplotBase,
    private = list(
        .run = function() {

            plotData <- self$data
            image <- self$results$indvalplot
            image$setState(plotData)

        },
        .plot = function(image, ...){
            
            plotData <- image$state
            
            if(self$options$jitter) {
                jitwidth = 0.1
            } else {
                jitwidth = 0
            }
            
            plot <- ggplot(plotData, aes_(x = as.name(self$options$group), y = as.name(self$options$dep)))
            
            if(self$options$showmean) {
                plot <- plot + geom_point(stat = "summary", fun = "mean", color = "red", size = 5)
            }
            
            if(self$options$showbars) {
                plot <- plot + geom_bar(stat = "summary", fun = "mean")
            }
            
            plot <- plot + geom_jitter(width = jitwidth)

            print(plot)
            
            TRUE
            
        })
)
