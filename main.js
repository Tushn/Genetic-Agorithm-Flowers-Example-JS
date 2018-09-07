/* CANVAS */
var canvas = document.getElementById('tela');
var context = canvas.getContext('2d');

// flies - beneficial insects air
var flies = new Array();
flies[0] = new Array(); // x
flies[1] = new Array(); // y
for(var i=0;i<ai.currentbeneficialairinsect;i++){
	flies[0][i]=parseInt((Math.random()*1000)%520);
	flies[1][i]=parseInt((Math.random()*1000)%50)+150;
}
// ants - beneficial insects eart
var ants = new Array();
ants[0] = new Array(); // x
ants[1] = new Array(); // y
for(var i=0;i<ai.currentbeneficialearthinsect;i++){
	ants[0][i]=parseInt((Math.random()*1000)%520);
	ants[1][i]=parseInt((Math.random()*1000)%50)+350;
}

// others
var terreno = parseInt(ai.currentNutrient/4); if(terreno==16){terreno=14};
var sol = 12+parseInt(ai.currentSunlight/20);
var temperatura = 12+parseInt(ai.currentTemperature/20);

// Becomes user input possible
function changeAttr(){
	// flies - beneficial insects air
	flies = new Array();
	flies[0] = new Array(); // x
	flies[1] = new Array(); // y
	for(var i=0;i<ai.currentbeneficialairinsect;i++){
		flies[0][i]=parseInt((Math.random()*1000)%520);
		flies[1][i]=parseInt((Math.random()*1000)%50)+150;
	}
	// ants - beneficial insects eart
	ants = new Array();
	ants[0] = new Array(); // x
	ants[1] = new Array(); // y
	for(var i=0;i<ai.currentbeneficialearthinsect;i++){
		ants[0][i]=parseInt((Math.random()*1000)%520);
		ants[1][i]=parseInt((Math.random()*1000)%50)+350;
	}
	
	// outros
	terreno = parseInt(ai.currentNutrient/4); if(terreno==16){terreno=14};
	sol = 12+parseInt(ai.currentSunlight/20);
	temperatura = 12+parseInt(ai.currentTemperature/20);
}

function hexadecimal(num, point){
	var n = '#';// = num%16;
	var vet = new Array(), quociente = num, resto;
	for(var i=point;i>=0;i--){
		//vet[i]=0;
		resto=quociente%16;
		if((parseInt(quociente/16)>quociente/16))
			quociente=parseInt(quociente/16)-1;
		else
			quociente=parseInt(quociente/16);
		//console.log("i: "+i+", quociente: "+quociente);
		//quociente=min(parseInt(quociente/16),quociente/16);
		switch(resto){
			case 10:
				vet[i]='a';
				break;
			case 11:
				vet[i]="b";
				break;
			case 12:
				vet[i]="c";
				break;
			case 13:
				vet[i]="d";
				break;
			case 14:
				vet[i]="e";
				break;
			case 15:
				vet[i]="f";
				break;
			case 16:
				vet[i]="0";
				break;
			case 0:
				if(quociente==1)
					vet[i]=resto;
				else
					vet[i]="0";
				break;
			default:
					vet[i]=resto;
		}
	}
	for(var i=0;i<vet.length;i++)
		n+=vet[i];
		
	return n;
}

function flower(){
	// caule
	context.lineWidth = 4;
	context.lineJoin = 'round';
	context.strokeStyle = '#552200';
	
	for(var i=0;i<ai.getNumFlowers();i++){
		var terrenoF = parseInt(ai.nutrient[i]/4); if(terrenoF==16){terrenoF=14};
		context.beginPath();
		context.strokeStyle = hexadecimal((256*(terrenoF+2)*17+terrenoF*17)*256,5);
		context.moveTo(20+i*(520/ai.getNumFlowers()), 380);
		context.lineTo(20+i*(520/ai.getNumFlowers()), 300-(ai.beneficialairinsect[i]-ai.beneficialearthinsect[i]));
		context.stroke();
		context.closePath();
		
		// flower
		context.beginPath();
		var solF = 12+parseInt(ai.sunlight[i]/20);
		var temperaturaF = 12+parseInt(ai.temperature[i]/20);
		context.strokeStyle = hexadecimal(solF*256*(256*16+256+17),5);//hexadecimal(16*parseInt(200+ai.currentSunlight),2);// hexadecimal(((257)*(15)*17)*256,5)
		context.fillStyle = hexadecimal(temperaturaF*256*(256*16+256+17),5);
		context.arc(20+i*(520/ai.getNumFlowers()), 300-(ai.beneficialairinsect[i]-ai.beneficialearthinsect[i]), 5+ai.water[i]/4, 0, (Math.PI/180)*360, true);
		context.fill();
		context.stroke();
		context.closePath();
	}
}

function draw(){
	// sky
	context.fillStyle = "#cfdffe";
	context.fillRect(0, 0, 520, 450);
	
	// land
	context.lineWidth = 4;
	context.lineJoin = 'round';
	context.strokeStyle = '#552200';
	
	context.beginPath();
	context.moveTo(0, 380);
	context.lineTo(520, 380);
	context.stroke();
	context.closePath();
	context.fillStyle = hexadecimal((256*(terreno+2)*17+terreno*17)*256,5);//"#220000";
	context.fillRect(0, 380, 520, 380);	
	
	// sun
	context.beginPath();
	context.strokeStyle = hexadecimal(sol*256*(256*16+256+17),5);//hexadecimal(16*parseInt(200+ai.currentSunlight),2);// hexadecimal(((257)*(15)*17)*256,5)
	context.fillStyle = hexadecimal(temperatura*256*(256*16+256+17),5);
	context.arc(100, 100, 20, 0, (Math.PI/180)*360, true);
	context.fill();
	context.stroke();
	context.closePath();
	
	// cloud
	context.beginPath();
	context.fillStyle="#fff";
	context.strokeStyle = "#fff";
	context.arc(260, 105, 15.5+ai.currentWater/4, 0, (Math.PI/180)*360, true);
	context.arc(250, 100, 15.5+ai.currentWater/4, 0, (Math.PI/180)*360, true);
	context.arc(280, 100, 15.5+ai.currentWater/4, 0, (Math.PI/180)*360, true);
	context.arc(260, 80, 15.5+ai.currentWater/4, 0, (Math.PI/180)*360, true);

	context.arc(290, 105, 15.5+ai.currentWater/4, 0, (Math.PI/180)*360, true);
	context.arc(280, 100, 15.5+ai.currentWater/4, 0, (Math.PI/180)*360, true);
	context.arc(310, 100, 15.5+ai.currentWater/4, 0, (Math.PI/180)*360, true);
	context.arc(290, 80, 15.5+ai.currentWater/4, 0, (Math.PI/180)*360, true);				
	context.fill();
	context.closePath();
	
	// flies - beneficial insects
	for(var i=0;i<ai.currentbeneficialairinsect;i++){
		flies[0][i]+=(Math.random()-0.5)*3;
		flies[1][i]+=(Math.random()-0.5)*3;
		if(flies[0][i]>520)
			flies[0][i]=520;
		else if(flies[0][i]<0)
			flies[0][i]=0;
		if(flies[1][i]>320)
			flies[1][i]=320;
		else if(flies[1][i]<0)
			flies[1][i]=0;
			
		context.beginPath();
		context.fillStyle="#000";
		context.strokeStyle = "#000";
		context.arc(flies[0][i], flies[1][i], 2, 0, (Math.PI/180)*360, true);
		context.fill();
		context.closePath();
	}
	// ants - currentbeneficialearthinsect
	for(var i=0;i<ai.currentbeneficialearthinsect;i++){
		ants[0][i]+=(Math.random()-0.5)*3;
		ants[1][i]+=(Math.random()-0.5)*3;
		if(ants[0][i]>520)
			ants[0][i]=520;
		else if(ants[0][i]<0)
			ants[0][i]=0;
		if(ants[1][i]>450)
			ants[1][i]=450;
		else if(ants[1][i]<380)
			ants[1][i]=380;
			
		context.beginPath();
		context.fillStyle="#f55";
		context.strokeStyle = "#000";
		context.arc(ants[0][i], ants[1][i], 2, 0, (Math.PI/180)*360, true);
		context.fill();
		context.closePath();
	}
	flower();
	
	if(evolutions>0){
		if(begin==undefined)
			begin = new Date().getTime();
	
			if(new Date().getTime() - begin > interval){
				ai.Evolve();
				evolutions--;
				begin = new Date().getTime();
				
				if(evolutions==0)
					begin = undefined;
			}
	}
}


	var elements = new Array();
	elements[0] = document.getElementById("temperature");
	elements[1] = document.getElementById("water");
	elements[2] = document.getElementById("sunlight");
	elements[3] = document.getElementById("nutrient");
	elements[4] = document.getElementById("beneficialairinsect");
	elements[5] = document.getElementById("beneficialearthinsect");
	
function insert(){
	if(elements[0].value!="")
		ai.currentTemperature=elements[0].value;
	if(elements[1].value!="")
		ai.currentWater=elements[1].value;
	if(elements[2].value!="")
		ai.currentSunlight=elements[2].value;
	if(elements[3].value!="")
		ai.currentNutrient=elements[3].value;
	if(elements[4].value!="")
		ai.currentbeneficialairinsect=elements[4].value;
	if(elements[5].value!="")
		ai.currentbeneficialearthinsect=elements[5].value;
	
	changeAttr();
}

setInterval(draw, 100);
//~ function animFrame(){
	//~ requestAnimationFrame(animFrame,tela);
	//~ draw();
//~ };

//~ animFrame();
