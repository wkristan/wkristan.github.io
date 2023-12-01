saveGIF({
  
  for(i in 1:10) {
    
    mosaicplot(table(ds.study),color=c("blue","red"), xlab = "DS status", ylab = "Test result",main="")
    mtext("The study population", side = 3, line = 2.5)
    mtext("1/2 of pregnancies are DS", side = 3, line = 1)
    mtext("\u2196          ", adj = 1, side = 1, line = 0, col = "red")
    mtext("False positives - 5% of No DS", adj = 1, side = 1, line = 0.75, cex = 0.7, font = 4, col = "red")
    mtext("  \u2197", adj = 0, side = 1, line = 0, col = "red")
    mtext("True positives - 60% of DS", adj = 0, side = 1, line = 0.75, cex = 0.7, font = 4, col = "red")
    
  }
  
  for(i in 1:20) {
    
    mosaicplot(table(ds.study),color=c("blue","red"), xlab = "DS status", ylab = "Test result",main="")
    mtext("Now we will apply these rates to a population", side = 3, line = 2.5)
    mtext("where DS is 1 in 1000 pregnancies", side = 3, line = 1)

  }
  
  ds.pop <- ds.study
  
  for(i in 1:500) {
    ds.table <- table(ds.pop)
    mosaicplot(ds.table, color=c("blue","red"), xlab = "DS status", ylab = "Test result",main="")
    mtext(paste("DS is 1 in ", sum(ds.table)/100), side = 3, line = 2.5)
    mtext(paste("P(DS|Positive) = True positives / total positives = ", formatC(ds.table[3]/sum(ds.table[3:4]), digits=4, format = "f")), side = 3, line = 1)
    ds.pop <- rbind(ds.pop, no.ds)
    
  }
  
  for(i in 1:10) {
    mosaicplot(ds.table,color=c("blue","red"), xlab = "DS status", ylab = "Test result",main="")
    mtext(paste("DS is 1 in ", sum(ds.table)/100), side = 3, line = 2.5)
    mtext("No change in sensitivity or error rate", side = 3, line = 1)
    mtext("\u2196          ", adj = 1, side = 1, line = 0, col = "red")
    mtext("False positives - 5% of No DS", adj = 1, side = 1, line = 0.5, cex = 0.7, font = 4, col = "red")
    mtext(" \u2197", adj = 0, side = 1, line = 0, col = "red")
    mtext("True positives - 60% of DS", adj = 0, side = 1, line = 0.5, cex = 0.7, font = 4, col = "red")
  
  }
  
}, interval =0.1, ani.width = 600, ani.height = 400)