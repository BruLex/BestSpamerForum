package app;

public class Response<T> {
    private Boolean success;
    private T data;

    public Boolean getSuccess() {
        return success;
    }
    public T getData() {
        return data;
    }
    public Response(Boolean status) {
        this.success = status;
    }
    public Response setData(T data) {
        this.data = data;
        return this;
    }
}
