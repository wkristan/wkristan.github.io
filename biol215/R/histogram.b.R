
# This file is a generated template, your changes will not be overwritten

histogramClass <- if (requireNamespace('jmvcore', quietly=TRUE)) R6::R6Class(
    "histogramClass",
    inherit = histogramBase,
    private = list(
        .run = function() {
            
            plotData <- self$data
            image <- self$results$histo
            image$setState(plotData)

        },
        .plot = function(image, ...){
            
            plotData <- image$state
            
            if(self$options$sturges) {
                nbins <- round(log2(length(plotData[,self$options$dep]))+1)
            } else {
                nbins <- self$options$bins
            }
            
            if(self$options$yscale == 'count') {
                yscale.type <- c('..count..')
            } else {
                yscale.type <- c('..density..')
            }
            
            if(length(self$options$group)>0) {
                plot <- ggplot(plotData, aes_(x = as.name(self$options$dep))) + 
                    geom_histogram(bins = nbins, aes_(y = as.name(yscale.type))) + 
                    facet_wrap(c(self$options$group))
                
            } else {
                plot <- ggplot(plotData, aes_(x = as.name(self$options$dep))) + 
                    geom_histogram(bins = nbins, aes_(y = as.name(yscale.type)))
            }
         print(plot)
         TRUE
        }
    )
)
