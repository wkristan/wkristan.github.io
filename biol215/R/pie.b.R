
# This file is a generated template, your changes will not be overwritten

pieClass <- if (requireNamespace('jmvcore', quietly=TRUE)) R6::R6Class(
    "pieClass",
    inherit = pieBase,
    private = list(
        .run = function() {
            tableData <- self$data
            
            if(length(self$options$freq)>0) {
                formula <- paste(self$options$freq, '~', self$options$dep)
                formula <- as.formula(formula)
                
                table.freqs <- data.frame(xtabs(formula = formula, data = tableData))

            } else {
            
                formula <- paste('~', self$options$dep)
                formula <- as.formula(formula)            
            
                table.freqs <- data.frame(xtabs(formula = formula, data = tableData))

            }

            table.freqs$rf <- table.freqs$Freq/sum(table.freqs$Freq)
            
            table <- self$results$piefreqs
            
            for(i in 1:length(table.freqs[,1])){
                table$addRow(rowKey=table.freqs[i,1], values=list(
                    levels=as.character(table.freqs[i,1]),
                    freq=table.freqs[i,2],
                    rfreq=table.freqs[i,3])
                )}
            
            plotData <- table.freqs
            image <- self$results$pie
            image$setState(plotData)
            },
            .plot=function(image, ...){
                
                plotData <- image$state
                
                blank_theme <- theme_minimal()+
                    theme(
                        axis.title.x = element_blank(),
                        axis.title.y = element_blank(),
                        panel.border = element_blank(),
                        panel.grid=element_blank(),
                        axis.ticks = element_blank(),
                        plot.title=element_text(size=14, face="bold")
                    )
                
                plotData$ypos <- sum(plotData$Freq) - (cumsum(plotData$Freq) - 0.5*plotData$Freq)
                
                plot <- ggplot(plotData, aes_(x = "", y=as.name('Freq'), fill=as.name(self$options$dep))) + 
                    geom_bar(stat="identity", width=1) + 
                    coord_polar("y", start=0, direction = -1) +
                    theme_void() +
                    theme(legend.position = "none") +
                    geom_text(aes_(y = as.name('ypos'), label = as.name(self$options$dep)))
                
                
                print(plot)
                
                TRUE
                
            }

        )
)
