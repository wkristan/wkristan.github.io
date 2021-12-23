
# This file is a generated template, your changes will not be overwritten

qqplotClass <- if (requireNamespace('jmvcore', quietly=TRUE)) R6::R6Class(
    "qqplotClass",
    inherit = qqplotBase,
    private = list(
        .run = function() {
            
            plotData <- self$data
            image <- self$results$qqplot
            image$setState(plotData)
            
            if(length(self$options$group)>0) {
                split(plotData[,self$options$dep], as.factor(plotData[,self$options$group])) -> plotData.list
            } else {
                list(plotData[,self$options$dep]) -> plotData.list
                names(plotData.list) <- self$options$dep
            }
            
            shap.test.output <- t(sapply(plotData.list, FUN = function(x) shapiro.test(x)))
            
            table <- self$results$normtest
            
            grps <- names(plotData.list)
            
            for(i in 1:length(grps)){
            table$addRow(rowKey=grps[i], values=list(
                levels=grps[i],
                W=as.numeric(shap.test.output[i,1]),
                p=as.numeric(shap.test.output[i,2])
            ))}
            
        },
        
        .plot=function(image, ...) {
            
            plotData <- image$state
            
            if(length(self$options$group)>0) {
                plot <- ggplot(plotData, aes_(sample = as.name(self$options$dep), color = as.name(self$options$group))) + 
                    stat_qq() + 
                    stat_qq_line()
            } else {
                plot <- ggplot(plotData, aes_(sample = as.name(self$options$dep))) + 
                    stat_qq() + 
                    stat_qq_line()
            }
            
            print(plot)
            TRUE
            
        })
)
