
# This file is automatically generated, you probably don't want to edit this

normprobOptions <- if (requireNamespace("jmvcore", quietly=TRUE)) R6::R6Class(
    "normprobOptions",
    inherit = jmvcore::Options,
    public = list(
        initialize = function(
            mean = 0,
            sd = 1,
            tail = NULL,
            value = 0,
            value_to = 0, ...) {

            super$initialize(
                package="biol215",
                name="normprob",
                requiresData=FALSE,
                ...)

            private$..mean <- jmvcore::OptionNumber$new(
                "mean",
                mean,
                default=0)
            private$..sd <- jmvcore::OptionNumber$new(
                "sd",
                sd,
                default=1)
            private$..tail <- jmvcore::OptionList$new(
                "tail",
                tail,
                options=list(
                    "upper",
                    "lower",
                    "both",
                    "middle"))
            private$..value <- jmvcore::OptionNumber$new(
                "value",
                value,
                default=0)
            private$..value_to <- jmvcore::OptionNumber$new(
                "value_to",
                value_to,
                default=0)

            self$.addOption(private$..mean)
            self$.addOption(private$..sd)
            self$.addOption(private$..tail)
            self$.addOption(private$..value)
            self$.addOption(private$..value_to)
        }),
    active = list(
        mean = function() private$..mean$value,
        sd = function() private$..sd$value,
        tail = function() private$..tail$value,
        value = function() private$..value$value,
        value_to = function() private$..value_to$value),
    private = list(
        ..mean = NA,
        ..sd = NA,
        ..tail = NA,
        ..value = NA,
        ..value_to = NA)
)

normprobResults <- if (requireNamespace("jmvcore", quietly=TRUE)) R6::R6Class(
    "normprobResults",
    inherit = jmvcore::Group,
    active = list(
        normplot = function() private$.items[["normplot"]]),
    private = list(),
    public=list(
        initialize=function(options) {
            super$initialize(
                options=options,
                name="",
                title="Normal probability distribution plot")
            self$add(jmvcore::Image$new(
                options=options,
                name="normplot",
                title="Normal distribution",
                width=400,
                height=300,
                renderFun=".plot"))}))

normprobBase <- if (requireNamespace("jmvcore", quietly=TRUE)) R6::R6Class(
    "normprobBase",
    inherit = jmvcore::Analysis,
    public = list(
        initialize = function(options, data=NULL, datasetId="", analysisId="", revision=0) {
            super$initialize(
                package = "biol215",
                name = "normprob",
                version = c(1,0,0),
                options = options,
                results = normprobResults$new(options=options),
                data = data,
                datasetId = datasetId,
                analysisId = analysisId,
                revision = revision,
                pause = NULL,
                completeWhenFilled = FALSE,
                requiresMissings = FALSE)
        }))

#' Normal probability distribution plot
#'
#' 
#' @param mean .
#' @param sd .
#' @param tail .
#' @param value .
#' @param value_to .
#' @return A results object containing:
#' \tabular{llllll}{
#'   \code{results$normplot} \tab \tab \tab \tab \tab an image \cr
#' }
#'
#' @export
normprob <- function(
    mean = 0,
    sd = 1,
    tail,
    value = 0,
    value_to = 0) {

    if ( ! requireNamespace("jmvcore", quietly=TRUE))
        stop("normprob requires jmvcore to be installed (restart may be required)")


    options <- normprobOptions$new(
        mean = mean,
        sd = sd,
        tail = tail,
        value = value,
        value_to = value_to)

    analysis <- normprobClass$new(
        options = options,
        data = data)

    analysis$run()

    analysis$results
}

