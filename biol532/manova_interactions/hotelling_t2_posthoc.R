tsquare.ph<-function(manova.model){
#This function calculates Hotelling's T-square as a post-hoc procedure following a significant one-way MANOVA#
##
output <- list("T2 Post-hoc comparisons" = data.frame(Comparison=NA,P.value=NA))
xvar <- as.name(names(manova.model$xlevels))
responses <- manova.model$model[1]
groups <- manova.model$model[2]

##
# Get the combinations:
##

combos <- t(combn(manova.model$xlevels[[1]],2))

# Main body of the procedure - cycle through for all combinations of groups.
##


for (i in 1:nrow(combos))
{

## Update the model with the desired subset
##
my.responses <- responses[groups == combos[i,],]
my.grps <- groups[groups == combos[i,]]
my.mod <- lm(my.responses ~ my.grps)
my.anova <- anova(my.mod, test = "Hotelling")

# Add the result of the comparison to the list
output[["T2 Post-hoc comparisons"]][i,] <- c(paste(combos[i,1],combos[i,2],sep=" - "),my.anova$"Pr(>F)"[2])
}

##
#3) Output the results#
##
return(output)
}
