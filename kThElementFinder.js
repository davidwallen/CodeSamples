/* test a different approach to traversing k from end of a singly linked list

idea is to create a window that points to the k elements...

*/

function FixedLengthQueue(size) {
    this.size = size;
    this.q = [];

    FixedLengthQueue.prototype.push = function(e) {
        this.q.push();
        if (this.q.length > this.size) {
            //we need to shift the array
            this.q.shift();
        }
    }



}
