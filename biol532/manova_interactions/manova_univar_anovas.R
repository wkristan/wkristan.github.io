manova.anovas<-function(data,group){

var.list <- colnames(data)
# Number of groups to be compared
g <- length(var.list)
# Set up the output list
output <- list()


##
# 2) Main body of the procedure - cycle through for all combinations of groups.
##

for (i in 1:g)
{
data.aov <- aov(data[,i]~group)
SSerror <- sum(data.aov[["residuals"]]^2)
SStotal <- sum((data[,i]-mean(data[,i]))^2)
SSmodel <- SStotal-SSerror
dfNum <- length(levels(group))-1
dfDenom <- data.aov[["df.residual"]]
MSerror <- SSerror/dfDenom
MSmodel <- SSmodel/dfNum
F <- MSmodel/MSerror
p.value <- 1-pf(F,df1=dfNum,df2=dfDenom)
tukey <- TukeyHSD(data.aov)[["group"]]
output <- c(output,list("Variable" = var.list[i], "ANOVA" = data.frame(F,dfNum,dfDenom,p.value),"Tukey"= tukey))
}
##
#3) Output the results#
##
return(output)
}
