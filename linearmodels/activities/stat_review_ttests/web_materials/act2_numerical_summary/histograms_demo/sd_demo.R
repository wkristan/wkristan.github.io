saveVideo({
  
  for(i in 1:5) {
    makeshade(-10, 10, c(-50,0), 3, "red")
    arrows(10, 0.1, 3, 0.01, length = 0.1)
    text(12, 0.15, labels = "16% of patients with\rno improvement")
    mtext(paste("Standard deviation: ", 10))
  }
  
  for(i in 0:50) {
    makeshade(-10, 10-6.667*i/50, c(-50,0), 3, "red")
    mtext(paste("Standard deviation: ", format(round(10-6.667*i/50,2),nsmall=2)))
    
  
  }
  arrows(10, 0.1, 3, 0.01, length = 0.1)
  text(12, 0.16, labels = "0.5% of\rpatients with\rno improvement")
  
}, interval = 0.1, ani.width = 400, ani.height = 300)