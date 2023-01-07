export default [
    {
      url: '/login',
      timeout: 1000,
      method: 'post',
      response: () => {
        return {
            code: 200,
            data: {
                "access_token": "0a7aaca279f6464194099a4124930b38",
                "expired_in": 86400,
                "refresh_token": "973e53ef385b41f8bc77d7977e3e0516"
            },
            message: 'ok',
            type: 'success',
          };
      },
    },
    // {
    //   url: '/api/admin_info',
    //   timeout: 1000,
    //   method: 'get',
    //   response: () => {
    //     // const token = getRequestToken(request);
    //     // if (!token) return resultError('Invalid token');
    //     return resultSuccess(adminInfo);
    //   },
    // },
  ];
  