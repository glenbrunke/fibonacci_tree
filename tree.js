////////////////////////////////////////////////////////////////////////////////
//
//  Fibonacci Tree - Created by Glen Brunke
//  November 6, 2023
//  https://www.glenbrunke.com/
//
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// class Branch
//
// Uses the JavaScript line method to draw a line on the canvas cooresponding 
// to a branch in a tree. Any branch can have leaves drawn on top of it. 
// The starting point of the line is given and the end point is calculated
// using the right triangle created by the given line angle from 0 (positive degrees
// make the line lean right, negative degrees make the line lean left).
// The length of the line is known (this.height), all angles are known (the provided angle, 
// 90 degrees for the right angle, and the remainder from 180 to get all triangle angles).
// The other 2 line lengths can be calcuted using sin() and cos() math functions in
// the updatedEndPoint() method.
//
////////////////////////////////////////////////////////////////////////////////


class Branch {
    constructor(x,y,angle) {
        this.x = x;
        this.y = y;
        this.color = `rgb(110, 50, 20)`;


        this.height = 40;
        this.width = 1;
        this.angleDegrees = angle;
        this.endX = 0;
        this.endY = 0;
        this.parentIndex = -1;
        this.childIndexR = -1;
        this.childIndexL = -1;
        
        this.updateEndPoint();
    }
    // updateAngle - changes the angle and endpoints of the branch object    
    updateAngle(newAngle) {
        this.angleDegrees = newAngle;
        this.updateEndPoint();    
    }
    
    // updates the color of the branch object based on provided r-g-b values
    setColor(redVal, greenVal, blueVal) {
        this.color = `rgb(${redVal}, ${greenVal}, ${blueVal})`;          
    }

  
    // lightenColor() - makes the RGB color values of the branch a lighter shade of brown, limit is 255 for rgb (white)
    lightenColor() {
        // Extract the RGB components
        var rgbPattern = /rgb\((\d+), (\d+), (\d+)\)/;
        var matches = this.color.match(rgbPattern);

        if (matches && matches.length === 4) {
            var r = parseInt(matches[1], 10); // Parse red component
            var g = parseInt(matches[2], 10); // Parse green component
            var b = parseInt(matches[3], 10); // Parse blue component

            // Add to each component, ensuring it doesn't go over 255
            r = Math.min(255, r + 10);
            g = Math.min(255, g + 10);
            b = Math.min(255, b + 10);

            this.setColor(r, g, b);

        }
    }

    // updateEndPoint - uses x and y coordinates of the starting point, they height of the branch, and angle of branch to calucate the end point of a line from the staring point. The 
    // results are updated end point coordinates in the branch object.
    updateEndPoint(){

        //triangle angles and sides
        let angleA = this.angleDegrees;
        let angleB = 90;
        let angleC = 180 - angleA - angleB;
        
        //convert to radians
        angleA = angleA * (Math.PI / 180);
        angleB = angleB * (Math.PI / 180);
        angleC = angleC * (Math.PI / 180);
        
        //calculate the length of each triangle side
        let sideB = this.height;    
        let sideC = Math.sin(angleA) * sideB;
        let sideA = Math.cos(angleA) * sideB;

        // sideC is the amount of X movement, sideA is the amount of Y movement 
        this.endX = this.x+sideC;
        this.endY = this.y - sideA;
    }
    
    //draw - draws the branch as a line with a rounded top using a circle
    draw(ctx) {

        //draw a line from the starting point to the end point
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();
        
        //draw a circle a the end of the branch to make connections look cleaner
        if(this.width > 1) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.endX, this.endY-1, (this.width/2), 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
        }
    }
    // drawLeafCluster() - uses the provided x and y coordinates to draw leaves in a small grouping relative to the coordinates. Draws 16 leaves in a small group.
    drawLeafCluster(ctx,x,y) {
        let this_cluster_x = x-2;
        let this_cluster_y = y;  
        
        this.drawLeaf(ctx,this_cluster_x, this_cluster_y);
        this.drawLeaf(ctx,this_cluster_x+4, this_cluster_y);
        this.drawLeaf(ctx,this_cluster_x-4, this_cluster_y);

        this.drawLeaf(ctx,this_cluster_x, this_cluster_y+3);
        this.drawLeaf(ctx,this_cluster_x+4, this_cluster_y-3);
        this.drawLeaf(ctx,this_cluster_x-4, this_cluster_y+3);
        this.drawLeaf(ctx,this_cluster_x-4, this_cluster_y-4);
        
        this.drawLeaf(ctx,this_cluster_x+7, this_cluster_y+3);
        this.drawLeaf(ctx,this_cluster_x+8, this_cluster_y-3);
        this.drawLeaf(ctx,this_cluster_x-8, this_cluster_y+3);
        
        this.drawLeaf(ctx,this_cluster_x+7, this_cluster_y+8);
        this.drawLeaf(ctx,this_cluster_x+8, this_cluster_y-8);
        this.drawLeaf(ctx,this_cluster_x-8, this_cluster_y+8);
    
        this.drawLeaf(ctx,this_cluster_x-7, this_cluster_y+8);
        this.drawLeaf(ctx,this_cluster_x-8, this_cluster_y-8);
        this.drawLeaf(ctx,this_cluster_x+8, this_cluster_y+8);
        
    }
    // drawLeaf() - creates a leaf like image by filling 1 pixel rectangles at relative locations to the provided x and y corrdinates. Draws only a single leaf.
    drawLeaf(ctx, x, y) {
        let this_leaf_x = x;
        let this_leaf_y = y;
    
        ctx.fillStyle = 'rgb(55,155,55)';
    
        ctx.fillRect(this_leaf_x+1,this_leaf_y,1,1)
        ctx.fillRect(this_leaf_x+2,this_leaf_y,1,1)
        ctx.fillRect(this_leaf_x+3,this_leaf_y,1,1)
    
        ctx.fillRect(this_leaf_x,this_leaf_y+1,1,1)
        ctx.fillRect(this_leaf_x+1,this_leaf_y+1,1,1)
        ctx.fillRect(this_leaf_x+2,this_leaf_y+1,1,1)
        ctx.fillRect(this_leaf_x+3,this_leaf_y+1,1,1)
        ctx.fillRect(this_leaf_x+4,this_leaf_y+1,1,1)
    
        ctx.fillStyle = 'rgb(25,105,25)';    
        ctx.fillRect(this_leaf_x,this_leaf_y+2,1,1)
        ctx.fillRect(this_leaf_x+1,this_leaf_y+2,1,1)
        ctx.fillRect(this_leaf_x+2,this_leaf_y+2,1,1)
        ctx.fillStyle = 'rgb(55,155,55)';
        ctx.fillRect(this_leaf_x+3,this_leaf_y+2,1,1)
        ctx.fillRect(this_leaf_x+4,this_leaf_y+2,1,1)   
    
        ctx.fillRect(this_leaf_x,this_leaf_y+3,1,1)
        ctx.fillRect(this_leaf_x+1,this_leaf_y+3,1,1)
        ctx.fillRect(this_leaf_x+2,this_leaf_y+3,1,1)
        ctx.fillRect(this_leaf_x+3,this_leaf_y+3,1,1)
        ctx.fillRect(this_leaf_x+4,this_leaf_y+3,1,1)

        ctx.fillRect(this_leaf_x+1,this_leaf_y+4,1,1)
        ctx.fillRect(this_leaf_x+2,this_leaf_y+4,1,1)
        ctx.fillRect(this_leaf_x+3,this_leaf_y+4,1,1)
    
    }
}

////////////////////////////////////////////////////////////////////////////////
// class Tree
//
// uses the branch class to construct and draw a tree based on the 
// Fibonacci number sequence. Both the number of branches per level
// and the width of the branchs are calulated using this number sequence.
//
////////////////////////////////////////////////////////////////////////////////

class Tree {
    constructor(x, y, levels) {
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.levels = levels;
        this.branches = [];
        
        this.buildTree();
    }
    
    //draw() - draws the entire tree as a set of branches, does not draw leaves
    draw(ctx) {
        for (const thisBranch of this.branches) {
            thisBranch.draw(ctx);
        }        
    }
    
    
    // drawLevel - draws only the specified level of the tree. If one of the top 2 levels is being drawn, leaves are drawn as well
    drawLevel(ctx, treeLevel) {
        
        for (let p = 1; p <= treeLevel; p++) {        
            let fIndex = this.getIndexOfFirstBranch(p);
            let lIndex = fIndex+this.getNumberOfBranches(p)-1;
                
            for (let w = fIndex; w <= lIndex; w++) {
                this.branches[w].draw(ctx);
                if (p == this.levels || p == this.levels-1) {
                    this.branches[w].drawLeafCluster(ctx,this.branches[w].endX, this.branches[w].endY );
                    this.branches[w].drawLeafCluster(ctx,this.branches[w].endX+10, this.branches[w].endY );
                    this.branches[w].drawLeafCluster(ctx,this.branches[w].endX-10, this.branches[w].endY );
                    this.branches[w].drawLeafCluster(ctx,this.branches[w].endX, this.branches[w].endY-10 );
                    this.branches[w].drawLeafCluster(ctx,this.branches[w].endX, this.branches[w].endY+10 );
                }
            }
        }
        
    }

    // printTree() - used for debugging only. Prints the indexes and levels of each branch in the tree
    printTree() {
        
        if (this.levels > 1) {
            
            for (let p = 2; p < this.levels+1; p++) {
                let fIndex = this.getIndexOfFirstBranch(p);
                let lIndex = fIndex+this.getNumberOfBranches(p)-1;
                
                for (let w = fIndex; w <= lIndex; w++) {
                    console.log ("LEVEL " + p + " [" + w + "] parent: " + this.branches[w].parentIndex + " childL:" + this.branches[w].childIndexL + " childR:" + this.branches[w].childIndexR + " width:" + this.branches[w].width);
                }
                
                console.log("level:" + p + " orphans:" + this.howManyChildrenLeft(p));
                console.log("a child that needs a parent is " + this.getChildIndexWithoutParent(p));
                console.log("a parent that needs a left child is " + this.getIndexOfParentWithNoChild(p-1, "L"));
                console.log("a parent that needs a right child is " + this.getIndexOfParentWithNoChild(p-1, "R"));
                console.log("---------------------------------------------");
                
            }
            
        }

        console.log("TRUNK [" + (this.branches.length-1) + "] parent: " + this.branches[this.branches.length-1].parentIndex + " childL:" + this.branches[this.branches.length-1].childIndexL + " childR:" + this.branches[this.branches.length-1].childIndexR);
    }
    
    //buildTree() - initializes all of the branch objects and connects them in a logical sequence. Ensures all branches have parents and that parents have at least one child
    buildTree() {
        let currentLevel = this.levels;
        let currentNumberOfBranches = 0;
        let currentBranchIndex = 0;
        
        for (let i = 0; i < this.levels; i++) { //loop through each level
        
            currentNumberOfBranches = this.getNumberOfBranches(currentLevel); //determine the total number of branches to be created at this level
            
            if (currentLevel < this.levels) { //if we are NOT at the highest level, assign children to these parents as we create them
                for (let t = 0; t < currentNumberOfBranches; t++) {
                    this.branches[currentBranchIndex] = new Branch(0, 0, 0);

                    if (Math.floor(Math.random()*10) < 5) { //randomly assign a child to either right or left 
                        this.branches[currentBranchIndex].childIndexR = this.getChildIndexWithoutParent(currentLevel+1);
                        this.branches[this.branches[currentBranchIndex].childIndexR].parentIndex = currentBranchIndex;
                    }
                    else {
                        this.branches[currentBranchIndex].childIndexL = this.getChildIndexWithoutParent(currentLevel+1);
                        this.branches[this.branches[currentBranchIndex].childIndexL].parentIndex = currentBranchIndex;
                    }
                        

                    
                    currentBranchIndex += 1;
                }

            }
            else { //if we are at the top most level, just create all of the children
                for (let j = 0; j < currentNumberOfBranches; j++) {
                    this.branches[currentBranchIndex] = new Branch(0, 0, 0);
                    this.branches[currentBranchIndex].width = 1;
                    currentBranchIndex += 1;
                }
            }
            
            currentLevel -= 1;
        } 
        
        this.assignOrphans();
        this.connectBranches();
        this.shadeBranches();

        //this.printTree();

    }
   
   //shadeBranches() - lightens the color as the tree is built from bottom (darker) to top (lighter) 
    shadeBranches() {

        if (this.levels > 1) {
            
            for (let p = 2; p < this.levels+1; p++) {
                let fIndex = this.getIndexOfFirstBranch(p);
                let lIndex = fIndex+this.getNumberOfBranches(p)-1;
                
                for (let w = fIndex; w <= lIndex; w++) {
                    for(let colorPasses = 0; colorPasses < p; colorPasses++) {
                        this.branches[w].lightenColor(); 
                    }

                }
                
            }
            
        }         
    }
    
    // connectBranches() - ensures that the starting points and ending points of all of the branch objects are connected properly.
    // The starting point of a child branch should be the end point of its parent.
    // This method also sets the angle of the branch depending on it's position as a R child or L child.
    connectBranches() {
     
        // connect the base of the trunk first
        this.branches[this.branches.length-1].x = this.x;
        this.branches[this.branches.length-1].y = this.y;
        this.branches[this.branches.length-1].updateAngle(0);
        this.branches[this.branches.length-1].width = this.getTotalTreeThickness(this.levels);


        if (this.levels > 1) {
            
            for (let p = 2; p < this.levels+1; p++) {
                let fIndex = this.getIndexOfFirstBranch(p);
                let lIndex = fIndex+this.getNumberOfBranches(p)-1;
                
                for (let w = fIndex; w <= lIndex; w++) {
                    this.branches[w].x = this.branches[this.branches[w].parentIndex].endX;
                    this.branches[w].y = this.branches[this.branches[w].parentIndex].endY;
                    this.branches[w].width = this.calculateWidth(w);
                    
                    let newAngle = Math.floor(Math.random()*25) + (4*p);
                    
                     if(this.branches[this.branches[w].parentIndex].childIndexL == w) {
                        this.branches[w].updateAngle(newAngle * -1);                         
                     }
                     else if (this.branches[this.branches[w].parentIndex].childIndexR == w) {
                        this.branches[w].updateAngle(newAngle);                         
                     }
                }
                
                
            }
            
        } 

     
       
    }
    
    // calculateWidth() - calculates the width of the specified branch by adding all of the branch widths of its children together.
    // This results in parents receiving a width of the number of the top most level children that they have. 
    // An example: if a parent at level 3 has 5 children at the top most level 6, that parent will have a width of 5.
    calculateWidth(branchIndex) {
        let currentIndex = 0;
        let calcWidths = [];
        
        while (currentIndex <= branchIndex) {
            calcWidths[currentIndex] = 0;
            if (this.branches[currentIndex].childIndexR != -1) {
               calcWidths[currentIndex] += calcWidths[this.branches[currentIndex].childIndexR];
            }
            
            if (this.branches[currentIndex].childIndexL != -1) {
               calcWidths[currentIndex] += calcWidths[this.branches[currentIndex].childIndexL];
            }
            
            if (calcWidths[currentIndex] == 0) {
                calcWidths[currentIndex] = 1;
            }
            currentIndex += 1;
        }
        
        return calcWidths[currentIndex-1];
    }
    
    //assignOrphans() - finds every branch within the object without a parent branch and assigns a parent to that branch
    assignOrphans() {
        if (this.levels > 1) {
            
            for (let p = 2; p < this.levels+1; p++) {
                let fIndex = this.getIndexOfFirstBranch(p);
                let lIndex = fIndex+this.getNumberOfBranches(p)-1;
                
                for (let w = fIndex; w <= lIndex; w++) {
                    if(this.branches[w].parentIndex == -1) {
                        let LParent = this.getIndexOfParentWithNoChild(p-1, "L");
                        let RParent = this.getIndexOfParentWithNoChild(p-1, "R");
                        if(LParent != -1) {
                            this.branches[w].parentIndex = LParent;
                            this.branches[LParent].childIndexL = w;
                        }
                        else if (RParent != -1) {
                            this.branches[w].parentIndex = RParent;
                            this.branches[RParent].childIndexR = w;                           
                        }
                    }
                }
                
                
            }
            
        }        
        
    }
    
    //getIndexOfParentWithNoChild() - returns the array index of a parent that doesn't have a child on the specified side ("R" for right or "L" for left)
    // returns the index of the parent or -1 if no parent can be found.
    getIndexOfParentWithNoChild(treeLevel, childSide) {
        let parentIndex = -1;
        let fIndex = this.getIndexOfFirstBranch(treeLevel);
        let lIndex = fIndex + this.getNumberOfBranches(treeLevel)-1; 
        
        
        if (childSide == "L") {
            if (this.branches[fIndex].childIndexL == -1) {
                parentIndex = fIndex;
            }
            else {
                for (let w = fIndex; w <= lIndex; w++) {
                    if (this.branches[w].childIndexL == -1) {
                        parentIndex = w;
                    }
                }  
            }
        }
        else {
            if (this.branches[lIndex].childIndexR == -1) {
                parentIndex = lIndex;
            }
            else {
                for (let w = fIndex; w <= lIndex; w++) {
                    if (this.branches[w].childIndexR == -1) {
                        parentIndex = w;
                    }
                }
            }
        }
        
        return parentIndex;
    }
    
    //getIndexOfFirstBranch() - returns the array index of the first branch at a specified tree level. This can be used to loop through each branch at a level.
    getIndexOfFirstBranch(treeLevel) {
        let indexOfFirstBranch = 0;
        let totalChildrenAtLevel = this.getNumberOfBranches(treeLevel);
        let currentLevel = this.levels;
        
        while (currentLevel > treeLevel) { //loop through all previous levels to count the number of precedeing children to get the index
            indexOfFirstBranch += this.getNumberOfBranches(currentLevel);   
            currentLevel -= 1;
        }
        
        return indexOfFirstBranch;
    }
    
    //getChildIndexWithoutParent() - returns the number of children that don't have parents assigned at a specified level
    getChildIndexWithoutParent(treeLevel) {
        let indexOfFirstChild = 0;
        let totalChildrenAtLevel = this.getNumberOfBranches(treeLevel);
        let childIndexToReturn = -1;
        
        indexOfFirstChild = this.getIndexOfFirstBranch(treeLevel);  

        for (let ci = 0 ; ci < totalChildrenAtLevel; ci++) { // loop through all children at the specified level to determine if they have a parent or not (-1 means they do not)
            if(this.branches[(ci+indexOfFirstChild)].parentIndex == -1 && childIndexToReturn == -1) {
                childIndexToReturn = ci+indexOfFirstChild
            }
        }
        return childIndexToReturn;  
    }

    // howManyChildrenLeft() - returns the number of children that don't have parents assigned at a specified level
    howManyChildrenLeft(treeLevel) {
        let indexOfFirstChild = 0;
        let totalChildrenAtLevel = this.getNumberOfBranches(treeLevel);
        let currentLevel = this.levels;
        let childrenRemaining = 0;
        
        while (currentLevel > treeLevel) { //loop through all previous levels to count the number of precedeing children to get the index
            indexOfFirstChild += this.getNumberOfBranches(currentLevel);   
            currentLevel -= 1;
        }
        
        
        for (let ci = 0 ; ci < totalChildrenAtLevel; ci++) { // loop through all children at the specified level to determine if they have a parent or not (-1 means they do not)
            if(this.branches[(ci+indexOfFirstChild)].parentIndex == -1) {
                childrenRemaining += 1;
            }
        }
        
        return childrenRemaining;
    }

    // getNumberOfBranches - provides the number of branches that should be at a given level
    // use Fibonacci sequence to calculate number of branches by level
    getNumberOfBranches(treeLevel) {
        let curNum = 1;
        let nextNum = 1;
        let prevNum = 0;
        
        for(let n = 0; n < treeLevel; n++) {
            prevNum = curNum;
            curNum = nextNum;
            nextNum = prevNum + curNum;
        }

        return curNum;  
    }
    
    getTotalTreeThickness(numberOfLevels) {
        return this.getNumberOfBranches(numberOfLevels);
    }
}

///////////////////////////////////////////////////////////////////////////////////
// Main program logic area
//////////////////////////////////////////////////////////////////////////////////
// creates the canvas and objects to draw

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//first tree is created
let myTree = new Tree(180,380, Math.floor(Math.random()*7+3)); 
let myLevels = 0;
    
let myBackgroundImage = new Image();
myBackgroundImage.src = "https://www.glenbrunke.com/java_script/fibonacci_tree/tree_bg.png";
    
let myForegroundImage = new Image();
myForegroundImage.src = "https://www.glenbrunke.com/java_script/fibonacci_tree/tree_fg.png";

// runAnimation - cycles through tree levels to create the tree building animation,
// after each tree is drawn completely, a new random tree is create and the cycle
// repeats.

function runAnimation() {
    //after each animation sequence the scene is cleared for the next frame
    ctx.clearRect(0, 0, 360, 450);
    ctx.drawImage(myBackgroundImage, 0, 0, 360,450);
    
    
    myLevels += 1;
    
    for (let g = 0; g < myLevels; g++) {
          myTree.drawLevel(ctx, g);  
    }

    if (myLevels > myTree.levels) { // this indicates we have cycled through all of the tree levels and can start over
        myLevels = 0;
    }
    
    if (myLevels == 0) { // before restarting animation sequence after previous tree, create a new tree of a random amount of levels (3-9 levels)
        myTree = new Tree(180,380, Math.floor(Math.random()*7+3));        
    }
    ctx.drawImage(myForegroundImage, 0, 361, 360,89);
}

// updates animation sequence once per 1000ms (1 second)
setInterval(runAnimation, 1000);