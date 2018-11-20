/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description 堆栈
 * @Company Beijing dsb
 */
export class Stack<T> {
    private dataSource: Array<T> = [];

    public push(element: T): void {
        this.dataSource.push(element);
    }

    public pop(): T | undefined {
        return this.dataSource.pop();
    }

    public peek(): T | undefined {
        if (this.size() == 0) {
            return undefined;
        }
        return this.dataSource[this.size() - 1];
    }

    public get(index: number): T | undefined {
        return this.dataSource[index];
    }

    public size(): number {
        return this.dataSource.length;
    }

    public clear(): void {
        this.dataSource = [];
    }
}