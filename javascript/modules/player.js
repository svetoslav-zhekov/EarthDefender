//Creating a Player class
export default class Player {
    constructor(resizePercent, img, c, ctx) {
        this.x = 0
        this.y = 0

        //If Its 100, Img Is At 100% Size And Will Not Change, If Its 50, It Will Resize To 50% Of Original Size
       this.resizePercent = resizePercent

       this.img = img
       this.c = c
       this.ctx = ctx
   }

   ResizePlayer(){
       //Resizing Player Depending On Percent
        this.img.width = this.img.width * (this.resizePercent/100);
        this.img.height = this.img.height * (this.resizePercent/100);
   }

   DrawPlayer() {
       //Resizing
       this.ResizePlayer();

       //MidScreen Const
        this.x = this.c.width / 2 - this.img.width / 2; 
        this.y = this.c.height / 2 - this.img.height / 2;

       //Draw Player Near Earth
       this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
   }

   //Getters
   get Width() { 
        return this.img.width;
   }

   get Height() {
        return this.img.height;
   }

   get PlayerX() {
        return this.x;
   }

   get PlayerY() {
        return this.y;
   }

   get ResizePercent() {
        return this.resizePercent;
   }

   RedrawPlayer(targetX, targetY) {
        
        //Set The New Player Positions
        this.x = targetX;
        this.y = targetY;

        this.ctx.drawImage(this.img, this.x - this.img.width / 2, this.y - this.img.height / 2, this.img.width, this.img.height);
   }
}