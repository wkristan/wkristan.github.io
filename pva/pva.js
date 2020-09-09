// This script handles all of the apps for my PVA exercise.

// Load the Google Charts api

google.charts.load('current', {'packages':['corechart']});

// Call the function that draws everything initially

google.charts.setOnLoadCallback(drawPage);

// Global variables for recording outcomes that accumulate
// First the Poisson fecundity stuff.

var randPoissonOffspring = [];
var randPoissonMeanOffspring = [["Individual","Running mean"]];
var poisCounter = 0;

// Then the random survival stuff

var randSurv = [];
var randSurvMean = [["Individual","Running probability"]];
var survCounter = 0;

// A counter for PVA that records the number of times a run went extinct

var pvaExtinct = 0;
var pvaRuns = 0;

// The function that draws all the apps when the page loads, called as a callback above.

function drawPage(){
	PopProjection();
	calcLambdaFromLefk();
	drawPoisson();
	drawSurvival();
	doDS();
	doES();
	doCat();
	doPVA();
}

// The initial population projection app
// Function to do the projection, draw the graph, and put estimates of lambda in the output table

function PopProjection() {
	var rates = getRatesFromApp();
   var proj_data = projectPop(rates);
   drawPopProjection(proj_data);
   estLambda(proj_data);
}

// Function to draw the graph for the population projection

function drawPopProjection(data_ar){
	var data = google.visualization.arrayToDataTable(data_ar);
   var pop_proj_options = {
       title: "Projected population - 10 years",
       pointSize: 5,
       hAxis: {title: "Years"},
       vAxis: {title: "Population size"},
       chartArea: {  width: "50%", height: "70%" }
    }

   var chart = new google.visualization.LineChart(document.getElementById('popProjection'));
   chart.draw(data, pop_proj_options);


}

// Function to get input demographic rates from the data entry fields in the app

function getRatesFromApp(){
	var jsurv = Number(document.getElementById("j_surv").value);
	var jtrans = Number(document.getElementById("j_trans").value);
	var adfec = Number(document.getElementById("ad_fec").value);
	var adsurv = Number(document.getElementById("ad_surv").value);
	var jn_t = Number(document.getElementById("j_n").value);
	var adn_t = Number(document.getElementById("a_n").value);
	
	var rates = [jsurv, jtrans, adfec, adsurv, jn_t, adn_t];
	
	return rates;

}

// Function to project the population using rates in an array, in the form [jsurv, jtrans, adfec, adsurv, jn_t, adn_t]
      
function projectPop(rates){
	var pop = [["Year","Juveniles","Adults"]];
	pop.push([0,rates[4],rates[5]]);
	var jn_t_1 = 0;
	var adn_t_1 = 0;
	for (i = 1; i<11; i++) {
		jn_t_1 = rates[0] * rates[4] + rates[2] * rates[5];
		adn_t_1 = rates[1] * rates[4] + rates[3] * rates[5];
		pop.push([i,jn_t_1,adn_t_1])
		rates[4] = jn_t_1;
		rates[5] = adn_t_1;		
	}

	return pop;

}

// Function to calculate the juvenile and adult population sizes, total size, and lambda estimated from Nt+1/Nt

function estLambda(data_ar){
	var lambdas = [];
	var ti = 0;
	var ti_1 = 0;
	var li = 0;
	var ti_1 = 0;
	var nextYr = 0;
	document.getElementById("j0").innerHTML = data_ar[1][1].toFixed(2);
	document.getElementById("a0").innerHTML = data_ar[1][2].toFixed(2);
	ti_1 = data_ar[1][1]+data_ar[1][2];
	document.getElementById("t0").innerHTML = ti_1.toFixed(2);
	for (i = 1; i < 11; i++) {
		nextYr = i + 1;
		document.getElementById("j"+i).innerHTML = data_ar[nextYr][1].toFixed(2);
		document.getElementById("a"+i).innerHTML = data_ar[nextYr][2].toFixed(2);
		ti = data_ar[i+1][1] + data_ar[nextYr][2];
		document.getElementById("t"+i).innerHTML = ti.toFixed(2);
		ti_1 = data_ar[i][1] + data_ar[i][2];
		li = ti/ti_1;
		document.getElementById("l"+i).innerHTML = li.toFixed(2);
	}


}

// Calculation of lambda from demographic rates
// Function to calculate lambda from input rates

function calcLambdaFromLefk() {
	var demogs = readInputsLambda();
	var a = 1;
	var b = -(demogs[0]+demogs[3]);
	var c = (demogs[0]*demogs[3] - demogs[2]*demogs[1]);
	var lambda_lefk = (-b + Math.sqrt(b*b - 4*a*c))/(2*a);
	document.getElementById("lambda_value").innerHTML = lambda_lefk.toFixed(4);
	
	var j_sa = 1000*demogs[2]/(demogs[2] + lambda_lefk - demogs[0]);
	var ad_sa = 1000*(lambda_lefk - demogs[0])/(demogs[2] + lambda_lefk - demogs[0]);
	document.getElementById("juv_n_sa").innerHTML = j_sa.toFixed(0);
	document.getElementById("ad_n_sa").innerHTML = ad_sa.toFixed(0);
}


// Function to read the input rates

function readInputsLambda() {
	var s_j = Number(document.getElementById("j_surv_l").value);
	var t_j = Number(document.getElementById("j_trans_l").value);
	var f_a = Number(document.getElementById("ad_fec_l").value);
	var s_a = Number(document.getElementById("ad_surv_l").value);
	
	var demogs = [s_j,t_j,f_a,s_a];
	return demogs;

}

// Function to reset inputs to initial values

function resetLefkLambda() {
	document.getElementById("j_surv_l").value = 0.4;
	document.getElementById("j_trans_l").value = 0.1;
	document.getElementById("ad_fec_l").value = 2;
	document.getElementById("ad_surv_l").value = 0.8;
	
	calcLambdaFromLefk();

}

// Demographic stochasticity in reproduction app
// Function to draw the two graphs used in the app

function drawPoisson(){
	var dist_ar = poissonDist(1.2);
	var rand_offsp = poissonRand(1.2);
	dist_ar[rand_offsp][2] = "red";
	dist_ar.unshift(["Offspring","Probability",{role: "style"}])
	var dist = google.visualization.arrayToDataTable(dist_ar);

	var dist_options = {
		title: "Individual outcomes - number of offspring",
		hAxis: {
			ticks: [0,1,2,3,4,5,6,7,8],
			title: "Offspring number"		
		},
		vAxis: {title: "Probability"},
		legend: "none"
	};
	
	var poisMeanData = google.visualization.arrayToDataTable(randPoissonMeanOffspring);
	
	var poisMean_options = {
		title: "Running mean number of offspring in population",
		hAxis: {title: "Individual number (pop. size)"},
		vAxis: {
			title: "Running mean reproductive rate",
			ticks: [0,1,1.2,2,3,4,5,6]					
		},
		legend: "none"
	};
	
	var poissonDistChart = new google.visualization.ColumnChart(document.getElementById("poisson_chart_div"));
	poissonDistChart.draw(dist, dist_options);
	
	var poissonMeanChart = new google.visualization.LineChart(document.getElementById("running_mean_poisson_div"));
	poissonMeanChart.draw(poisMeanData, poisMean_options);

}

// Function to calculate the Poisson dist with parameter l - output formatted for use in column chart with blue bars

function poissonDist(l){
	var dist = [];
	var p = 0;
	for (i = 0; i<l*4; i++) {
		p = jStat.poisson.pdf(i,l);
		dist.push([i,p,"blue"]);
		}
	return dist;
}

// Function to randomly select offspring number from a Poisson distribution with parameter l

function poissonRand(l){
	var cdf = [];
	var p = 0;
	var n = 0;
	var rand_p = Math.random();
	for (i = 0; i < l*4; i++) {
			p = jStat.poisson.cdf(i,l);
			cdf.push(p);
	}
	for (i = 0; i < cdf.length; i++) {
			if(rand_p < cdf[i]) {
				n = i;
				break;			
			}
	}
	
	poisCounter = poisCounter + 1;
	randPoissonOffspring.push(n);
	var meanOffsp = arrayMean(randPoissonOffspring);
	randPoissonMeanOffspring.push([poisCounter, meanOffsp]);
	return n;
}

// Function to calculate the mean of a one-dimensional array

function arrayMean(arr) {
	var sum = 0;
	for (i = 0; i < arr.length; i++) {
			sum = sum + Number(arr[i]);
	}
	return sum/arr.length;


}

// Function to reset the arrays that record multiple random selections to initial values

function resetPoisArrays() {
	randPoissonOffspring = [];
	randPoissonMeanOffspring = [["Individual","Running mean"]];
	poisCounter = 0;
	drawPoisson();
}

// Function to draw the two graphs used in the demographic stochasticity in survival app
// Function to draw the two graphs used in the app

function drawSurvival(){
	var dist_ar = survDist();
	var rand_surv = survRand(0.4);
	dist_ar[1-rand_surv][2] = "red";
	dist_ar.unshift(["Survival","Probability",{role: "style"}])
	var dist = google.visualization.arrayToDataTable(dist_ar);

	var dist_options = {
		title: "Individual juvenile survival outcomes",
		hAxis: {
			title: "Survival outcome"		
		},
		vAxis: {title: "Probability"},
		legend: "none",
		isStacked: true
	};

	var survProbData = google.visualization.arrayToDataTable(randSurvMean);
	
	var survProb_options = {
		title: "Running juvenile survival probability in population",
		hAxis: {title: "Individual number (pop. size)"},
		vAxis: {
			title: "Running survival probability",
			ticks: [0,0.2,0.4,0.6,0.8,1]					
		},
		legend: "none"
	};
	
	var survProbChart = new google.visualization.ColumnChart(document.getElementById("survival_chart_div"));
	survProbChart.draw(dist, dist_options);
	
	var runningSurvChart = new google.visualization.LineChart(document.getElementById("running_survival_div"));
	runningSurvChart.draw(survProbData, survProb_options);

}

// Function to make the array of the distribution for adult survival - two fixed values

function survDist(){
	var dist = [];
	dist.push(["Live",0.4,"blue"]);
	dist.push(["Die",0.6,"blue"]);
	
	return dist;
}

// Function to randomly determine if an individual lives or dies, with a survival probability of surv_p (set to 0.8 in the app)

function survRand(surv_p){
	var surv = Number(Math.random() < surv_p);
	survCounter = survCounter + 1;
	randSurv.push([surv]);
	var meanSurv = arrayMean(randSurv);
	randSurvMean.push([survCounter, meanSurv]);	
	
	return surv;
}

// Function to reset survival arrays to initial conditions

function resetSurvArrays() {
	randSurv = [];
	randSurvMean = [["Individual","Running probability"]];
	survCounter = 0;
	drawSurvival();
}

// Demographic stochasticity app - combine stochasticity in survival and fecundity into a population projection model
// Do all the steps - called as a callback above

function doDS(){
	var data_ar = PopProjectionDS();
	drawPopProjectionDS(data_ar);

}


// Generate the data

function PopProjectionDS() {
	var n0 = Number(document.getElementById("ds_n").value);
	var na0 = Math.round(0.3333 * n0);
	var nj0 = Math.round(0.6667 * n0);
	var rates = [];
	var pops_current = [nj0,na0];
	var pops = [["Year","Juveniles","Adults"]];

	for (i = 0; i<101; i++) {
		rates = makeDemStochRates(pops_current);
		pops.push([i,rates[4],rates[5]]);
		pops_current[0] = rates[0] * rates[4] + rates[2] * rates[5];
		pops_current[1] = rates[1] * rates[4] + rates[3] * rates[5];
	}

	return pops;
}


// Draw the graph

function drawPopProjectionDS(data_ar){
	var final_pop = data_ar[99][1] + data_ar[99][2];
	var data = google.visualization.arrayToDataTable(data_ar);
   var pop_proj_DS_options = {
		 chartArea: {  width: "60%", height: "70%" },
       title: "Projected population - 100 years",
       pointSize: 5,
       hAxis: {title: "Years"},
       vAxis: {title: "Population size"}
    }

   var chart = new google.visualization.LineChart(document.getElementById('popProjectionDS'));
   chart.draw(data, pop_proj_DS_options);
   
   document.getElementById("final_n_ds").innerHTML = "Final population size: " + final_pop;


}


// Function to build the demographic rates for one time step, subject to demographic stochasticity - requires an array with current pop sizes for juveniles and adults

function makeDemStochRates(pop_sizes) {
	var juv_n = pop_sizes[0];
	var ad_n = pop_sizes[1];
	var js = 0;
	var jt = 0;
	var as = 0;
	var af = 0;
	for (j = 0; j < juv_n; j++) {
		js = js + survRandSim(0.4);
		jt = jt + survRandSim(0.1);
	}
	
	if (juv_n > 0) {
		js = js/juv_n;
		jt = jt/juv_n;
	} else {
		js = 0;
		jt = 0;
	}
	for (j = 0; j < ad_n; j++){
		as = as + survRandSim(0.8);
		af = af + poisRandSim(1.2);
	}
	
	if (ad_n > 0) {
		as = as/ad_n;
		af = af/ad_n;
	} else {
		as = 0;
		af = 0;	
	}
	var rates = [js, jt, af, as, juv_n, ad_n];
	return rates;	

}


// Function to generate random survival data with probability surv_p for simulation models

function survRandSim(surv_p) {
	var surv = Number(Math.random() < surv_p);	
	return surv;
}

// Function to generate random reproduction data with mean of l for simulation models

function poisRandSim(l){
	var cdf = [];
	var p = 0;
	var n = 0;
	for (k = 0; k < l*5*Math.sqrt(l); k++) {
			p = jStat.poisson.cdf(k,l);
			cdf.push(p);
	}
	var rand_p = Math.random();
	for (k = 0; k < cdf.length; k++) {
			if(rand_p < cdf[k]) {
				n = k;
				break;			
			}
	}
	
	return n;
}

// Environmental stochasticity app - illustrate random annual variation in survival and reproduction. Select survival from normal distribution on a logit scale, 
// and fecundity from a log normal distribution


// PROBLEMS: need to let pop go to 0 if it gets below a threshold - no actual 0 possible.

// Function to call the functions to generate the data and then to draw the graph. Referred to in callback above.

function doES(){
	var pops = projectPopES();
	drawPopProjectionES(pops);

}


// Function to generate the rates each year.

function randRatesES(pops, var_amt){
	
	var rates_for_es = [[0.24,0.06,0.4,0.7,pops[0],pops[1]],
		[0.256,0.064,0.48,0.71,pops[0],pops[1]],
		[0.272,0.068,0.56,0.72,pops[0],pops[1]],
		[0.288,0.072,0.64,0.73,pops[0],pops[1]],
		[0.304,0.076,0.72,0.74,pops[0],pops[1]],
		[0.32,0.08,0.8,0.75,pops[0],pops[1]],
		[0.336,0.084,0.88,0.76,pops[0],pops[1]],
		[0.352,0.088,0.96,0.77,pops[0],pops[1]],
		[0.368,0.092,1.04,0.78,pops[0],pops[1]],
		[0.384,0.096,1.12,0.79,pops[0],pops[1]],
		[0.4,0.1,1.2,0.8,pops[0],pops[1]],
		[0.416,0.104,1.28,0.81,pops[0],pops[1]],
		[0.432,0.108,1.36,0.82,pops[0],pops[1]],
		[0.448,0.112,1.44,0.83,pops[0],pops[1]],
		[0.464,0.116,1.52,0.84,pops[0],pops[1]],
		[0.48,0.12,1.6,0.85,pops[0],pops[1]],
		[0.496,0.124,1.68,0.86,pops[0],pops[1]],
		[0.512,0.128,1.76,0.87,pops[0],pops[1]],
		[0.528,0.132,1.84,0.88,pops[0],pops[1]],
		[0.544,0.136,1.92,0.89,pops[0],pops[1]],
		[0.56,0.14,2,0.9,pops[0],pops[1]]];
	
	if (var_amt == "low") {
		var rates = rates_for_es[Math.floor(Math.random()*5+8)];
	}
	if (var_amt == "mod") {
		var rates = rates_for_es[Math.floor(Math.random()*11+5)];
	}
	if (var_amt == "high") {
		var rates = rates_for_es[Math.floor(Math.random()*21)];	
	}

	return rates;

}

// Function to project the population, in a form that can be plotted.

function projectPopES() {
	
	var n = Number(document.getElementById("pop_n_es").value);
	var var_amt = document.getElementById("es_var").value;
	var pops = [["Year","Juveniles","Adults"]]
	var pops_current = [Math.round(n * 0.6667), Math.round(n * 0.3333)];
	var rates = [];
		for (i = 0; i<101; i++) {
		rates = randRatesES(pops_current,var_amt);
		pops.push([i,rates[4],rates[5]]);
		pops_current[0] = rates[0] * rates[4] + rates[2] * rates[5];
		pops_current[1] = rates[1] * rates[4] + rates[3] * rates[5];
		if (pops_current[0] < 1){
			pops_current[0] = 0;		
		}
		if (pops_current[1] < 1) {
			pops_current[1] = 0;		
		}
	}
	

	return pops;
	
}

// Function that draws the population projection for ES runs

function drawPopProjectionES(data_ar){
	var final_pop = data_ar[99][1] + data_ar[99][2];
	var data = google.visualization.arrayToDataTable(data_ar);
   var pop_proj_ES_options = {
		 chartArea: {  width: "60%", height: "70%" },
       title: "Projected population - 100 years",
       pointSize: 5,
       hAxis: {title: "Years"},
       vAxis: {title: "Population size"}
    }

   var chart = new google.visualization.LineChart(document.getElementById('popProjectionES'));
   chart.draw(data, pop_proj_ES_options);
   
   document.getElementById("final_n_es").innerHTML = "Final population size: " + final_pop.toFixed(0);


}


// Function to generate random survival probabilities. Standard deviation will be assigned 0.1 if Low, 0.9 if Moderate, and 1.5 if High variation selected.

function randSurvES(p,dev) {
	var mean = Math.log(p/(1-p));
	var p_logit = mean + dev;
	var p_rand = Math.exp(p_logit)/(1+Math.exp(p_logit));
	
	return p_rand;

}

// Function to generate random fecundities - lognormal distribution with a mean of log(1.2), back-transformed. Standard deviation set to 0.1 for Low, 0.6 for Mod, 1.1 for High variation.

function randFecundES(dev){
	var mean = Math.log(1.2);
	var mean_ln = mean + dev;
	var mean_rand = Math.exp(mean_ln);
	
	return mean_rand;	
	
	}


// Catastrophes app - illustrate random mortality occuring on average every 25 years, killing between 10-90% of the population.

// Function to call the functions to generate the data and then to draw the graph. Referred to in callback above.

function doCat(){
	var pop_cat = projectPopCat();
	drawPopProjectionCat(pop_cat);

}

function drawPopProjectionCat(data_ar) {
	var final_pop = data_ar[99][1] + data_ar[99][2];
	var data = google.visualization.arrayToDataTable(data_ar);
   var pop_proj_Cat_options = {
		 chartArea: {  width: "60%", height: "70%" },
       title: "Projected population - 100 years",
       pointSize: 5,
       hAxis: {title: "Years"},
       vAxis: {title: "Population size"}
    }

   var chart = new google.visualization.LineChart(document.getElementById('popProjectionCat'));
   chart.draw(data, pop_proj_Cat_options);
   
   document.getElementById("final_n_cat").innerHTML = "Final population size: " + final_pop.toFixed(0);


}

function projectPopCat(){
	var pop = [["Year","Juveniles","Adults"]];
	var n_start = Number(document.getElementById("pop_n_cat").value);
	var n_j_0 = 0.6798 * n_start;
	var n_a_0 = 0.3202 * n_start;
	var rates = [0.4, 0.1, 1.3, 0.8, n_j_0, n_a_0]
	pop.push([0,rates[4],rates[5]]);
	var jn_t_1 = 0;
	var adn_t_1 = 0;
	var intensity = 0;
	for (i = 1; i<101; i++) {
		if (isCat()) {
			intensity = Math.random()*0.8+0.1;
			jn_t_1 = rates[0] * rates[4] * intensity + rates[2] * rates[5] * intensity;
			adn_t_1 = rates[1] * rates[4] * intensity + rates[3] * rates[5] * intensity;
			if (jn_t_1 < 1) {
				jn_t_1 = 0;
			}
			if (adn_t_1 < 1) {
				adn_t_1 = 0;			
			}
			pop.push([i,jn_t_1,adn_t_1])
			rates[4] = jn_t_1;
			rates[5] = adn_t_1;				
	
		} else {
			jn_t_1 = rates[0] * rates[4] + rates[2] * rates[5];
			adn_t_1 = rates[1] * rates[4] + rates[3] * rates[5];
			pop.push([i,jn_t_1,adn_t_1])
			rates[4] = jn_t_1;
			rates[5] = adn_t_1;		
	}
}

	return pop;


}

function isCat() {
	var cat_occ = Math.random() < 0.04;
	return cat_occ; 
}

// PVA app - combine all three types of stochasticity into one simulation model.

// Function to call the simulation and plot the output - called above.

function doPVA() {
	var rates_pva = getRatesPVA();
	var pop_pva = projectPopPVA(rates_pva);
	drawPopProjectionPVA(pop_pva);
}

// Get the rates input into the app

function getRatesPVA() {
	var jsurv_pva = Number(document.getElementById("j_surv_pva").value);
	var jtrans_pva = Number(document.getElementById("j_trans_pva").value);
	var adfec_pva = Number(document.getElementById("ad_fec_pva").value);
	var adsurv_pva = Number(document.getElementById("ad_surv_pva").value);
	var jn_t_pva = Number(document.getElementById("j_n_pva").value);
	var adn_t_pva = Number(document.getElementById("a_n_pva").value);
	
	var rates_pva_form = [jsurv_pva, jtrans_pva, adfec_pva, adsurv_pva, jn_t_pva, adn_t_pva];
	
	return rates_pva_form;


}

// Run the simulation

function projectPopPVA(rates_pva_form) {
	
	var pop_pva = [["Year","Juveniles","Adults"]];
	pop_pva.push([0,rates_pva_form[4],rates_pva_form[5]]);
	var init_n = rates_pva_form[4] + rates_pva_form[5];
	
	for (q = 1;q < 101;q++){
		
		// First select this year's expected rates given env stochast
	
		var rates_es = randRatesPVA(rates_pva_form);
	
		// Then calculate this year's actual rates given demographic stochast
	
		var rates_allstoch = makeDemStochRatesPVA(rates_es);
	
		// Then pick this year's starting population size given catastrophes
	
		if (isCat()) {
			var intensity = Math.random()*0.8+0.1;
			rates_allstoch[4] = rates_allstoch[4] * intensity;
			rates_allstoch[5] = rates_allstoch[5] * intensity;	
		}
	
		// Project the population one year
	
		var j_n_t_1 = rates_allstoch[4] * rates_allstoch[0] + rates_allstoch[5] * rates_allstoch[2];
		var ad_n_t_1 = rates_allstoch[4] * rates_allstoch[1] + rates_allstoch[5] * rates_allstoch[3];
	
		if (j_n_t_1 < 1) {
			j_n_t_1 = 0;	
		}
		if (ad_n_t_1 < 1) {
			ad_n_t_1 = 0;	
		}
		
		// Add a hard limit to population size of 4 x initial to avoid runaway growth
		
		if (j_n_t_1 + ad_n_t_1 > 4*init_n) {
			j_n_t_1 = rates_allstoch[4];
			ad_n_t_1 = rates_allstoch[5];		
		}
	
		rates_pva_form[4] = j_n_t_1;
		rates_pva_form[5] = ad_n_t_1;
	
		pop_pva.push([q, j_n_t_1, ad_n_t_1]);

	}
	
	// Return the final population
	
	return pop_pva;

}

// Plot the run - just the total population size this time

function drawPopProjectionPVA(data_ar) {
	var final_pop_pva = data_ar[99][1] + data_ar[99][2];
	var data = google.visualization.arrayToDataTable(data_ar);
   var pop_proj_pva_options = {
		 chartArea: {  width: "60%", height: "70%" },
       title: "Projected population - 100 years",
       pointSize: 5,
       hAxis: {title: "Years"},
       vAxis: {title: "Population size"}
    }

   var chart = new google.visualization.LineChart(document.getElementById('popProjectionPVA'));
   chart.draw(data, pop_proj_pva_options);
   
   document.getElementById("final_n_pva").innerHTML = "Final population size: " + final_pop_pva.toFixed(0);
   pvaRuns = pvaRuns + 1;
   if (final_pop_pva == 0) {
		pvaExtinct = pvaExtinct + 1;   
   }
   document.getElementById("extinctions").innerHTML = "Extinction rate = Extinctions (" + pvaExtinct +") / Number of runs (" + pvaRuns + ") = "+ (pvaExtinct/pvaRuns).toFixed(2);
   
	var lambda_lefk_pva = calcLambdaFromLefkPVA();  
	document.getElementById("lambda_of_lefkovitch").innerHTML = "&lambda; with this Lekovitch matrix = " + lambda_lefk_pva.toFixed(2);
}

// Function for calculating rates for PVA with environmental stochasticity

function randRatesPVA(rates_pva_form){
	
	var rand_dev = jStat.normal.sample(0,0.1);
	var sj = randSurvES(rates_pva_form[0],rand_dev);
	var tj = randSurvES(rates_pva_form[1],rand_dev);
	var sa = randSurvES(rates_pva_form[3],rand_dev);
	var fa = randFecundPVA(rates_pva_form[2],rand_dev);
	
	if (sj+tj > 1){
		sj = sj/(sj+tj);
		tj = tj/(sj+tj);
	}
	
	var rates = [sj, tj, fa, sa, rates_pva_form[4], rates_pva_form[5]];
	return rates;

}

function randFecundPVA(mean_pva,dev){
	var mean = Math.log(mean_pva);
	var mean_ln = mean + dev;
	var mean_rand = Math.exp(mean_ln);
	
	return mean_rand;	

}

// Function for calculating the rates for PVA with demographic stochasticity

function makeDemStochRatesPVA(rates_pva_es) {
	var juv_n = rates_pva_es[4];
	var ad_n = rates_pva_es[5];
	var js = 0;
	var jt = 0;
	var as = 0;
	var af = 0;
	for (j = 0; j < juv_n; j++) {
		js = js + survRandSim(rates_pva_es[0]);
		jt = jt + survRandSim(rates_pva_es[1]);
	}
	
	if (juv_n > 0) {
		js = js/juv_n;
		jt = jt/juv_n;
	} else {
		js = 0;
		jt = 0;
	}
	for (j = 0; j < ad_n; j++){
		as = as + survRandSim(rates_pva_es[3]);
		af = af + poisRandSim(rates_pva_es[2]);
	}
	
	if (ad_n > 0) {
		as = as/ad_n;
		af = af/ad_n;
	} else {
		as = 0;
		af = 0;	
	}
	var rates = [js, jt, af, as, juv_n, ad_n];
	return rates;	

}

function resetPVA(){
	pvaExtinct = 0;
   pvaRuns = 0;
   doPVA();

}

function calcLambdaFromLefkPVA() {
	var demogs = getRatesPVA();
	var a = 1;
	var b = -(demogs[0]+demogs[3]);
	var c = (demogs[0]*demogs[3] - demogs[2]*demogs[1]);
	var lambda_lefk = (-b + Math.sqrt(b*b - 4*a*c))/(2*a);

	return lambda_lefk;
}
