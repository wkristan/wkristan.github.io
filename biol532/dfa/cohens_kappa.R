kappa.biol532 <- function(confusion) {
  
  sum(diag(confusion)) -> correct
  
  colSums(confusion) -> col.totals
  rowSums(confusion) -> row.totals
  sum(confusion) -> grand.total
  
  sum((col.totals * row.totals)/grand.total) -> expected.correct
  
  (correct - expected.correct)/(grand.total - expected.correct) -> cohens.kappa
  
  return(cohens.kappa)
  
}