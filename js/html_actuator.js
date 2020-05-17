function HTMLActuator(){this.tileContainer=document.querySelector(".tile-container"),this.scoreContainer=document.querySelector(".score-container"),this.bestContainer=document.querySelector(".best-container"),this.messageContainer=document.querySelector(".game-message"),this.score=0}HTMLActuator.prototype.actuate=function(e,t){var o=this;window.requestAnimationFrame(function(){o.clearContainer(o.tileContainer),e.cells.forEach(function(e){e.forEach(function(e){e&&o.addTile(e)})}),o.updateScore(t.score),o.updateBestScore(t.bestScore),t.terminated&&(t.over?o.message(!1):t.won&&o.message(!0))})},HTMLActuator.prototype.continueGame=function(){this.clearMessage()},HTMLActuator.prototype.clearContainer=function(e){for(;e.firstChild;)e.removeChild(e.firstChild)},HTMLActuator.prototype.addTile=function(e){var t=this,o=document.createElement("div"),i=document.createElement("div"),s=e.previousPosition||{x:e.x,y:e.y},n=this.positionClass(s),r=["tile","tile-"+e.value,n];e.value>2048&&r.push("tile-super"),this.applyClasses(o,r),i.classList.add("tile-inner"),i.innerHTML='<img src="assets/tiles/'+e.value+'.jpg" style="width:100%;">',e.previousPosition?window.requestAnimationFrame(function(){r[2]=t.positionClass({x:e.x,y:e.y}),t.applyClasses(o,r)}):e.mergedFrom?(r.push("tile-merged"),this.applyClasses(o,r),e.mergedFrom.forEach(function(e){t.addTile(e)})):(r.push("tile-new"),this.applyClasses(o,r)),o.appendChild(i),this.tileContainer.appendChild(o)},HTMLActuator.prototype.applyClasses=function(e,t){e.setAttribute("class",t.join(" "))},HTMLActuator.prototype.normalizePosition=function(e){return{x:e.x+1,y:e.y+1}},HTMLActuator.prototype.positionClass=function(e){return"tile-position-"+(e=this.normalizePosition(e)).x+"-"+e.y},HTMLActuator.prototype.updateScore=function(e){this.clearContainer(this.scoreContainer);var t=e-this.score;if(this.score=e,this.scoreContainer.textContent=this.score,t>0){var o=document.createElement("div");o.classList.add("score-addition"),o.textContent="+"+t,this.scoreContainer.appendChild(o)}},HTMLActuator.prototype.updateBestScore=function(e){this.bestContainer.textContent=e},HTMLActuator.prototype.message=function(e){var t=e?"game-won":"game-over",o=e?"YOU WIN!":"Game over!";this.messageContainer.classList.add(t),this.messageContainer.getElementsByTagName("p")[0].textContent=o},HTMLActuator.prototype.clearMessage=function(){this.messageContainer.classList.remove("game-won"),this.messageContainer.classList.remove("game-over")};