
# This file is a generated template, your changes will not be overwritten

frequenciesClass <- if (requireNamespace('jmvcore', quietly=TRUE)) R6::R6Class(
    "frequenciesClass",
    inherit = frequenciesBase,
    private = list(
        .run = function() {

            tableData <- self$data
            
            formula <- paste('~', self$options$dep)
            formula <- as.formula(formula)            
            
            table.freqs <- data.frame(xtabs(formula = formula, data = tableData))
            table.freqs$rf <- table.freqs$Freq/sum(table.freqs$Freq)
            
            table <- self$results$freqs
            
            for(i in 1:length(table.freqs[,1])){
                table$addRow(rowKey=table.freqs[i,1], values=list(
                    levels=as.character(table.freqs[i,1]),
                    freq=table.freqs[i,2],
                    rfreq=table.freqs[i,3])
                )}
            
            plotData <- table.freqs
            image <- self$results$countbar
            image$setState(plotData)

        },
        .plot=function(image, ...){
            
            plotData <- image$state
            
            if(self$options$yscale) {
                yscale.type <- 'rf'
                ylab = "Relative frequency"
            } else {
                yscale.type <- 'Freq'
                ylab = "Frequency"
            }
            
            plot <- ggplot(plotData, aes_(x = as.name(self$options$dep))) + 
                geom_bar(aes_(weight = as.name(yscale.type))) + labs(y = ylab)
            
            print(plot)
            
            TRUE
            
        }
        
        
        )
)
