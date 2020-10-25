let envURL = process.env.REACT_APP_PROXY_URL
const urlMapping = {
  authentication: function (data) {
    return {
      url: envURL+`/auth`,
      method: "POST",
      dataType: "json",
      cache: false,
      data:data,
      contentType: "application/json; charset=UTF-8",
      timeout: 40000,
    };
  },
  userRepo: function () {
    return {
      url: envURL+`/repo`,
      method: "GET",
      dataType: "json",
      cache: false,
      contentType: "application/json; charset=UTF-8",
      timeout: 40000,
    };
  }
};
/**
 * default variables are exported
 * so they can be accessed through out the
 * application wherever imported
 */
export default urlMapping;
export { envURL };
