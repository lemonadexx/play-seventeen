function GameManager(e,t,i,a,r,s,n){this.version=n,this.targetTile=t,this.size=e,this.summonCNT=i,this.inputManager=new a,this.storageManager=new s(n),this.actuator=new r,this.startTiles=2,this.inputManager.on("move",this.move.bind(this)),this.inputManager.on("restart",this.restart.bind(this)),this.inputManager.on("keepPlaying",this.keepPlaying.bind(this)),this.setup()}GameManager.prototype.restart=function(){document.getElementById("prompt-id").style.display="none",document.getElementById("overlay-id").style.display="none",this.storageManager.clearGameState(),this.actuator.continueGame(),this.setup()},GameManager.prototype.keepPlaying=function(){this.keepPlaying=!0,this.actuator.continueGame()},GameManager.prototype.isGameTerminated=function(){return this.over||this.won&&!this.keepPlaying},GameManager.prototype.setup=function(){var e=this.storageManager.debugger();e?(this.grid=new Grid(e.grid.size,e.grid.cells),this.score=e.score,this.over=e.over,this.won=e.won,this.keepPlaying=e.keepPlaying):(this.grid=new Grid(this.size),this.score=0,this.over=!1,this.won=!1,this.keepPlaying=!1,this.addStartTiles()),this.actuate()},GameManager.prototype.addStartTiles=function(){for(var e=0;e<this.startTiles;e++)this.addRandomTile()},GameManager.prototype.addRandomTile=function(){if(this.grid.cellsAvailable()){var e=Math.random()<.9?2:4,t=new Tile(this.grid.randomAvailableCell(),e);return this.grid.insertTile(t),!0}return!1},GameManager.prototype.actuate=function(){this.storageManager.getBestScore()<this.score&&this.storageManager.setBestScore(this.score),this.over?this.storageManager.clearGameState():this.storageManager.setGameState(this.serialize()),this.actuator.actuate(this.grid,{score:this.score,over:this.over,won:this.won,bestScore:this.storageManager.getBestScore(),terminated:this.isGameTerminated()})},GameManager.prototype.serialize=function(){return{grid:this.grid.serialize(),score:this.score,over:this.over,won:this.won,keepPlaying:this.keepPlaying}},GameManager.prototype.prepareTiles=function(){this.grid.eachCell(function(e,t,i){i&&(i.mergedFrom=null,i.savePosition())})},GameManager.prototype.moveTile=function(e,t){this.grid.cells[e.x][e.y]=null,this.grid.cells[t.x][t.y]=e,e.updatePosition(t)},GameManager.prototype.move=function(e){var t=this;if(!this.isGameTerminated()){var i,a,r=this.getVector(e),s=this.buildTraversals(r),n=!1;if(this.prepareTiles(),s.x.forEach(function(e){s.y.forEach(function(s){if(i={x:e,y:s},a=t.grid.cellContent(i),console.log(a),a){var o=t.findFarthestPosition(i,r),l=t.grid.cellContent(o.next);if(console.log("postions: "+o),console.log("next: "+l),console.log("----------------------"),l&&l.value===a.value&&!l.mergedFrom){var h=new Tile(o.next,2*a.value);h.mergedFrom=[a,l],t.grid.insertTile(h),t.grid.removeTile(a),a.updatePosition(o.next),t.score+=h.value,h.value===t.targetTile&&(t.won=!0)}else t.moveTile(a,o.farthest);t.positionsEqual(i,a)||(n=!0)}})}),n){for(var o=0;o<this.summonCNT&&this.addRandomTile();++o);this.movesAvailable()||(this.over=!0),this.actuate()}}},GameManager.prototype.getVector=function(e){return{0:{x:0,y:-1},1:{x:1,y:0},2:{x:0,y:1},3:{x:-1,y:0}}[e]},GameManager.prototype.buildTraversals=function(e){for(var t={x:[],y:[]},i=0;i<this.size;i++)t.x.push(i),t.y.push(i);return 1===e.x&&(t.x=t.x.reverse()),1===e.y&&(t.y=t.y.reverse()),t},GameManager.prototype.findFarthestPosition=function(e,t){var i;do{e={x:(i=e).x+t.x,y:i.y+t.y}}while(this.grid.withinBounds(e)&&this.grid.cellAvailable(e));return{farthest:i,next:e}},GameManager.prototype.movesAvailable=function(){return this.grid.cellsAvailable()||this.tileMatchesAvailable()},GameManager.prototype.tileMatchesAvailable=function(){for(var e,t=0;t<this.size;t++)for(var i=0;i<this.size;i++)if(e=this.grid.cellContent({x:t,y:i}))for(var a=0;a<4;a++){var r=this.getVector(a),s={x:t+r.x,y:i+r.y},n=this.grid.cellContent(s);if(n&&n.value===e.value)return!0}return!1},GameManager.prototype.positionsEqual=function(e,t){return e.x===t.x&&e.y===t.y};