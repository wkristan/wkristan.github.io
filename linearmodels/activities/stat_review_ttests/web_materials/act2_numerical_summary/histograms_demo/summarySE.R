summarySE <- function(df, measurevar, groups) {
  
  if(length(groups) == 1) {
    grp.list <- list(df[,groups])
    names(grp.list) <- groups
  } else grp.list <- as.list(df[,groups])
  
  output <- aggregate(df[,measurevar], by = grp.list, FUN = mean)
  names(output)[length(groups)+1] <- "mean"
  output$sd <- aggregate(df[,measurevar], by = grp.list, FUN = sd)[,length(groups)+1]
  output$n <- aggregate(df[,measurevar], by = grp.list, FUN = length)[,length(groups)+1]
  output$se <- output$sd / sqrt(output$n)
  output$lower <- output$mean - qt(0.975, output$n-1) * output$se
  output$upper <- output$mean + qt(0.975, output$n-1) * output$se
  
  return(output)
}