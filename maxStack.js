  function Stack() {
      // initialize an empty array
      this.items = [];

      // push a new item to the last index
      Stack.prototype.push = function(item) {
          this.items.push(item);
      };

      // remove the last item
      Stack.prototype.pop = function() {
          // if the stack is empty, return null
          // (it would also be reasonable to throw an exception)
          if (!this.items.length) {
              return null;
          }
          return this.items.pop();
      };

      // see what the last item is
      Stack.prototype.peek = function() {
          if (!this.items.length) {
              return null;
          }
          return this.items[this.items.length - 1];
      };
  }

  function MaxStack() {
      this.stack = new Stack();
      this.maxsStack = new Stack();


      // Add a new item to the top of our stack. If the item is greater
      // than or equal to the last item in maxsStack, it's
      // the new max! So we'll add it to maxsStack.
      MaxStack.prototype.push = function(item) {
          this.stack.push(item);
          if (!this.maxsStack.peek() || item >= this.maxsStack.peek()) {
              this.maxsStack.push(item);
          }
          return item;
      };

      // Remove and return the top item from our stack. If it equals
      // the top item in maxsStack, they must have been pushed in together.
      // So we'll pop it out of maxsStack too.
      MaxStack.prototype.pop = function() {
          var item = this.stack.pop();
          if (item === this.maxsStack.peek()) {
              this.maxsStack.pop();
          }
          return item;
      };

      // see what the last item is
      MaxStack.prototype.peek = function() {
          return this.stack.peek();
      };

      // The last item in maxsStack is the max item in our stack.
      MaxStack.prototype.getMax = function() {
          return this.maxsStack.peek();
      };
  }


  var stackArray = [1, 3, 3, 2, 3, 4, 5, 5, 4, 3, 5, 6, 7, 3, 6, 3],
      ms = new MaxStack();


  for (var i = 0; i < stackArray.length; i++) {
      ms.push(stackArray[i]);
  }

  console.log({
      maxStack: ms.maxsStack,
      stack: ms.stack
  });

  for (var i = stackArray.length; i >= 1; i--) {
      //lets slice this array
      var localArray = stackArray.slice(0, i);
      localArray.sort();
      var expectedMax = localArray[i - 1],
          stackMax = ms.getMax();

      if (expectedMax !== stackMax) {
          console.log({
              expectedMax,
              stackMax,
              localArray,
              maxStack: ms.maxsStack,
              stack: ms.stack
          });

      }
      ms.pop();

  }


  process.exit();
  