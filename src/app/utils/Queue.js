
export default class {
    constructor (size, opts = {}) {
        this.Queue=[];

        //向队列中添加数据
        this.push = function(data) {
            if (data==null) {
                return false;
            }
           
            this.Queue.unshift(data);
            return true;
        }

        //从队列中取出数据
        this.pop = function() {
            return this.Queue.pop();
        }

        //返回队列的大小
        this.size = function() {
            return this.Queue.length;
        }

        //返回队列的内容
        this.getQueue = function() {
            return this.Queue;
        }
    }
}
