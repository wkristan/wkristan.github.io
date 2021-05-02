extractAICc <- function(y) {
  #y is your model list. The following commands match the online instructions,
  #except that y is used in place of model.list.
  model.aic <- data.frame(t(sapply(y, extractAIC)))
  names(model.aic) <- c("params","AIC")
  model.aic$AICc <- with(model.aic, AIC + 2*params*(params+1)/(26-params-1))
  model.aic$dAICc <- model.aic$AICc - min(model.aic$AICc)
  model.aic$wts <- with(model.aic, exp(-0.5*dAICc)/sum(exp(-0.5*dAICc)))
  #The command return() is used to provide output from this function.
  return(model.aic)
}