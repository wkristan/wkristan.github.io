
# This file is a generated template, your changes will not be overwritten

normprobClass <- if (requireNamespace('jmvcore', quietly=TRUE)) R6::R6Class(
    "normprobClass",
    inherit = normprobBase,
    private = list(
        .run = function() {
            
        },
        .plot=function(image, ...) {

            lower <- self$options$mean - self$options$sd * 3
            upper <- self$options$mean + self$options$sd * 3
            xlimits <- c(lower, upper)
            
            plot <- ggplot(NULL)
            
            if(self$options$tail == "lower") {
                shaderange <- c(xlimits[1], self$options$value)
                prob <- pnorm(self$options$value, mean = self$options$mean, sd = self$options$sd)
                plot <- plot + stat_function(fun = dnorm, geom = "area", fill = "red", xlim = shaderange, args = c(mean = self$options$mean, sd = self$options$sd))
                } 
            
            if(self$options$tail == "upper") {
                shaderange <- c(self$options$value, xlimits[2])
                prob <- pnorm(self$options$value, mean = self$options$mean, sd = self$options$sd, lower.tail = F)
                plot <- plot + stat_function(fun = dnorm, geom = "area", fill = "red", xlim = shaderange, args = c(mean = self$options$mean, sd = self$options$sd))
            }
            
            if(self$options$tail == "middle") {
                shaderange <- c(self$options$value, self$options$value_to)
                prob <- pnorm(self$options$value_to, mean = self$options$mean, sd = self$options$sd) - pnorm(self$options$value, mean = self$options$mean, sd = self$options$sd)
                plot <- plot + stat_function(fun = dnorm, geom = "area", fill = "red", xlim = shaderange, args = c(mean = self$options$mean, sd = self$options$sd))
            }
            
            if(self$options$tail == "both"){
                if(self$options$value < 0) {from <- -1*self$options$value} else {from <- self$options$value}
                shaderange1 <- c(xlimits[1], -from)
                shaderange2 <- c(from, xlimits[2])
                prob <- 2*pnorm(from, mean = self$options$mean, sd = self$options$sd, lower.tail = F)
                plot <- plot + stat_function(fun = dnorm, geom = "area", fill = "red", xlim = shaderange1, args = c(mean = self$options$mean, sd = self$options$sd))
                plot <- plot + stat_function(fun = dnorm, geom = "area", fill = "red", xlim = shaderange2, args = c(mean = self$options$mean, sd = self$options$sd))
            }
            
            plot <- plot + xlim(xlimits) + stat_function(fun = dnorm, geom = "line", xlim = xlimits, args = c(mean = self$options$mean, sd = self$options$sd)) + labs(title = paste("Probability = ", prob))
            print(plot)
            TRUE
            
        })
)
