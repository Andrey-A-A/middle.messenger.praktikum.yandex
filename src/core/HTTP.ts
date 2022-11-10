import { request } from "http";

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE' 
};

export type Options = {
  method?: METHOD;
  //data?: any;
  data?: Record<string, unknown> | string;
  timeout?: number;
  headers?: Record<string, string>
};

// type OptionsWithoutMethod = Omit<Options, 'method'>;

function queryStringify(data: Record<string, unknown> | string) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

class HTTP {
  get = (url:string, options = {}) => {
    return this.request(url, { ...options, method: METHOD.GET });
  };

  post = (url:string, options: Options) => {
        
    return this.request(url, { ...options, method: METHOD.POST });
  };

  put = (url:string, options = {}) => {
    return this.request(url, { ...options, method: METHOD.PUT });
  };

  delete = (url:string, options = {}) => {
    return this.request(url, { ...options, method: METHOD.DELETE });
  };

  request = (url:string, options: Options = {method: METHOD.GET}) => {
    const { headers = {'Content-Type': 'application/json'}, method, data } = options;
    const realUrl = `https://ya-praktikum.tech/api/v2${url}`

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }
      
      const xhr = new XMLHttpRequest();
      
      const isGet = method === METHOD.GET;

      xhr.open(method, isGet && !!data ? `${realUrl}${queryStringify(data)}` : realUrl );
      xhr.responseType = 'json';
      xhr.withCredentials = true;
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
        
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default new HTTP ()
