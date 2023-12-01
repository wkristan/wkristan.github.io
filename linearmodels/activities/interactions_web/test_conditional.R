# This function tests for differences in mean for one variable from an interaction, called test.var, at each
# level of the other, called cond.var.

  # First, make sure multcomp is loaded - require() loads libraries needed.
  require(multcomp)
  
  # The function begins here. It takes three arguments, the fitted model (mod), the conditioning variable (cond.var), and the
  # variable being tested (called test.var).

test.conditional <- function(mod, cond.var, test.var) {
  
  # We need to build the contrast matrix, and we're going to do it in stages.
  # We need the levels for test.var and cond.var, so we will extract them and put them in objects.
  
  levels.test <- mod$xlevels[[test.var]]
  levels.cond <- mod$xlevels[[cond.var]]
  
  # We will use the sets of levels to build a matrix with all of the possible combinations of both
  # variables. The function expand.grid() takes our lists of factor levels and builds the matrix we need from them.
  
  tmp <- expand.grid(levels.test, levels.cond)
  
  # We now can name the columns for two variables we are using.
  
  colnames(tmp) <- c(test.var, cond.var)
  
  # The model.matrix() function will make the design matrix for us. We need to give it the formula
  # used in our linear model, which we can get with the formula() functon applied to mod. Using the
  # -2 index drops the response variable from the formula - the design is just a function of the predictors,
  # so we don't include the response variable in the design matrix.
  #
  # If you were to do this procedure by hand, you could specify the model as ~light*water, but 
  # it is VERY IMPORTANT that the model formula used in this command has the variables in the same 
  # order as mod. If the order is reversed (~water*light) the analysis will complete without any error
  # messages, but the results will be wrong.
  
  X <- model.matrix(formula(mod)[-2], data=tmp)
  
  # Now we will start to build the contrast matrix. To help us get the labeling and ordering of
  # the comparisons right, we will use multcomp's contrMat() function to give us a Tukey contrast matrix
  # for comparisons of the levels of test.var. The table() function is being used to count up replicates
  # which it uses to develop the contrast matrix.
  
  Tukey <- contrMat(table(mod$model[test.var]), "Tukey")
  
  # This matrix is the building block, but we need to expand it to account for the different
  # levels of cond.var. That's what we'll do next. We are going to use a loop, and we have to set up
  # a couple of objects we'll use to build the final contrast matrix, which will be called K.
  # First, we make an empty K matrix that we can fill up.
  
  K <- c()
  
  # Then we find out how many levels there are for each variable - length() counts up how many levels there are.
  
  num.levels <- length(levels.test)
  num.cond <- length(levels.cond)
  
  # Now we'll build K one level of cond.var at a time. The for() function is used for loops in R.
  # We will specify that we want to do the following operation once for each of the elements in
  # 0 to the number of levels in the conditioning varible minus 1. The counter variable that keeps
  # track of how many times through the loop we've taken is i, so i is set to 0 the first time, 1 the 
  # second time, up to num.cond - 1.
  
  for(i in 0:(num.cond-1)){
    
    # We will be adding a matrix of 0's either before or after the Tukey comparison matrix. The 
    # number of sets of 0's is set by leads (for 0's before Tukey) and follows (for 0's after
    # Tukey).
    
    leads <- i
    follows <- num.cond - 1 - i
    
    # Now we will add the needed 0's before and/or after Tukey. The first time through there
    # are no 0's before Tukey, so leads is 0, and leads*ncol(Tukey) is zero - a matrix with
    # 0 columns is appended before Tukey. The last time through there are no zeros following Tukey,
    # so follows is 0, ncol(Tukey)*follows is zero, and a matrix of 0 columns is appended after Tukey.
    # If there are three or more levels for the conditioning matrix there will be some number of sets
    # of zeros before and after Tukey, as indicated by the non-zero values of leads and follows.
    
    K.tmp <- cbind(matrix(0, nrow = nrow(Tukey), ncol = leads*ncol(Tukey)), Tukey, matrix(0, nrow = nrow(Tukey), ncol = follows*ncol(Tukey)))
    
    # Row names added to K.tmp, to reflect the comparison being made.

    rownames(K.tmp) <- paste(levels.cond[i+1], row.names(K.tmp), sep = ":")
    
    # K is now constructed by appending the new rows of the matrix we made in K.tmp to any existing
    # in K.
    
    K <- rbind(K, K.tmp)
    
  }
  
  # Now that K is complete, we add column names. The column names on Tukey are used, repeated
  # once for each number of condition variable levels.
  
  colnames(K) <- rep(colnames(Tukey), num.cond)
  
  # We calculate the comparisons, with linfct equal to the matrix multiplication of the contrast
  # matrix (K) and the design matrix (X)
  
  tests <- glht(mod, linfct = K %*% X)
  
  # The function returns tests, which contains the glht() output.
  
  return(tests)
  
  
}