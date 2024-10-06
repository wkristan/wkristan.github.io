mv.posthoc <- function(data = data.set.name, responses = reponse.var.list, group.var = grouping.variable.name) {
  groups <- levels(as.factor(data[, group.var]))
  comps <- combn(groups, m = 2, simplify = F)
  names(comps) <- sapply(comps, FUN = function(x) paste(x, collapse = " - "))
  form <- as.formula(paste('cbind(', paste(responses, collapse = ","),') ~',group.var))
  manovas.ph <- list()
  for (i in comps) {
    data.tmp <- data[data[,group.var] %in% i, ]
    summary(manova(form, data = data.tmp)) -> manovas.ph[[paste(i, collapse = "-")]]
  }
  p <- sapply(manovas.ph, FUN = function(x) x$stats[1,6])
  data.frame(p) -> pvals
  return(pvals)
}