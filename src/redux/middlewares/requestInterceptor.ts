// export const requestInterceptor =
//   ({ dispatch }) =>
//   (next) =>
//   (action) => {
//     if (
//       action.payload?.status === 500 &&
//       process.env.REACT_APP_ENV !== 'development'
//     ) {
//       window.location.href = '/500';
//     } else if (
//       action.payload?.status === 401 &&
//       localStorage.getItem('token')
//     ) {
//       localStorage.removeItem('token');

//       setTimeout(() => {
//         if (typeof window !== 'undefined') window.location.reload();
//       }, 1000);
//     } else {
//       next(action);
//     }
//   };

const RequestInterceptor = () => (next: any) => (action: any) => {
  if (action.payload?.status === 500) {
    // window.location.href = '/500';
  } else if (action.payload?.status === 401 && localStorage.getItem('token')) {
    localStorage.removeItem('token');

    setTimeout(() => {
      if (typeof window !== 'undefined') window.location.reload();
    }, 1000);
  } else {
    next(action);
  }
};

export default RequestInterceptor;
