const RequestInterceptor = () => (next: any) => (action: any) => {
  if (action.payload?.status === 500) {
    window.location.href = '/500';
  } else if (action.payload?.status === 401 && localStorage.getItem('token')) {
    localStorage.clear();

    setTimeout(() => {
      if (typeof window !== 'undefined') window.location.reload();
    }, 1000);
  } else {
    next(action);
  }
};

export default RequestInterceptor;
