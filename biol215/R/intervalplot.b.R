
# This file is a generated template, your changes will not be overwritten

intervalplotClass <- if (requireNamespace('jmvcore', quietly=TRUE)) R6::R6Class(
    "intervalplotClass",
    inherit = intervalplotBase,
    private = list(
        .run = function() {
            formula <- constructFormula(self$options$dep, self$options$group)
            formula <- as.formula(formula)
            
            plotData  <- aggregate(formula, self$data, mean)
            plotData$sd    <- aggregate(formula, self$data, sd)[,self$options$dep]
            plotData$n     <- aggregate(formula, self$data, length)[,self$options$dep]
            plotData$se <- plotData$sd/sqrt(plotData$n)
            plotData$sel    <- plotData[,self$options$dep] - plotData$se
            plotData$seu    <- plotData[,self$options$dep] + plotData$se
            plotData$cil <- plotData[,self$options$dep] - plotData$se*qt(0.975, df = plotData$n - 1)
            plotData$ciu <- plotData[,self$options$dep] + plotData$se*qt(0.975, df = plotData$n - 1)
            if(self$options$inttype == 'stder') {
                plotData$ll <- plotData$sel
                plotData$ul <- plotData$seu
            } else {
                plotData$ll <- plotData$cil
                plotData$ul <- plotData$ciu
            }
            
            image <- self$results$plot
            image$setState(plotData)
        },
        .plot=function(image, ...) {
            plotData <- image$state
            
            inttypes <- data.frame(stder = c("\u00B1 1 standard error"), confint = c("95% confidence intervals"))
            
            plot <- ggplot(plotData, aes_(x=as.name(self$options$group), y=as.name(self$options$dep))) +
                geom_errorbar(aes(ymin=ll, ymax=ul, width=0.1)) +
                geom_point() +
                labs(title=self$options$dep, subtitle = paste("Error bars are ", inttypes[1,self$options$inttype]))
            print(plot)
            TRUE
        })
)
