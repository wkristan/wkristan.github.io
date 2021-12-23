
# This file is a generated template, your changes will not be overwritten

regplotClass <- if (requireNamespace('jmvcore', quietly=TRUE)) R6::R6Class(
    "regplotClass",
    inherit = regplotBase,
    private = list(
        .run = function() {
            
            plotData <- self$data
            image <- self$results$scatter
            image$setState(plotData)
        },
        .plot=function(image, ...) {
            plotData <- image$state
            
            plot <- ggplot(plotData, aes_(x = as.name(self$options$indep), y = as.name(self$options$dep))) +
                geom_point() +
                geom_smooth(method = "lm", se = F) +
                labs(title= paste("Regression of ", self$options$dep, " on ", self$options$indep))
            print(plot)
            TRUE

        })
)
