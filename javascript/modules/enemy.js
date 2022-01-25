//Creating a Enemy class
export default class Enemy {
    constructor(x, y, resizePercent, img, c, ctx, velocity) {
        //The Randomized Starting Positions (X And Y)
        this.x = x
        this.y = y

        //If Its 100, Img Is At 100% Size And Will Not Change, If Its 50, It Will Resize To 50% Of Original Size
       this.resizePercent = resizePercent

       this.img = img
       this.c = c
       this.ctx = ctx
       this.velocity = velocity

       //Resize
       this.ResizeEnemy();
   }

   ResizeEnemy(){
       //Resizing Enemy Depending On Percent
        this.img.width = this.img.width * (this.resizePercent/100);
        this.img.height = this.img.height * (this.resizePercent/100);
   }

   DrawEnemy() {
       //Draw Enemy
       this.ctx.drawImage(this.img, this.x - this.img.width / 2, this.y - this.img.width / 2, this.img.width, this.img.height);
   }

   //Getters
   get Width() { 
        return this.img.width;
   }

   get Height() {
        return this.img.height;
   }

   get EnemyX() {
        return this.x;
   }

   get EnemyY() {
        return this.y;
   }

   get ResizePercent() {
        return this.resizePercent;
   }

   RedrawEnemy() {
        //Set The New Enemy Positions
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;

        //Draw Enemy With Updated Coordinates
        this.DrawEnemy(); 
   }
}