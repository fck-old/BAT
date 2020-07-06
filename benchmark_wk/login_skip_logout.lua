-- example script that demonstrates response handling and
-- retrieving an authentication token to set on all future
-- requests

token = nil
path  = "/accounts/login/"
login = false
counter = 0

request = function()
    if not login then
	   if not token
	   	then 
	   	    path  = "/accounts/login/"
	   	    counter = 0
		    wrk.headers["Content-Type"] = "application/x-www-form-urlencoded"
	   	    return wrk.format("GET", path)
	   	else 
	   	    if wrk.body then
	   	    	wrk.body = wrk.body .. "&username=Vincent2&password=AchtMal8"
	   	    	login = true
	   	    	return wrk.format("POST", path)
	   	    end
	   end
    else 
    	if counter < 40 then
    	    path = "/untagged/"
    	    counter = counter + 1
    	    return wrk.format("GET", path)
    	else 
    	    path = "/accounts/logout/"
    	    login = false
    	    return wrk.format("GET", path)
    	end	
    end	   
end

response = function(status, headers, body)
   if body then
   	token = body.find(body, "csrfmiddlewaretoken\" value=")
   	if token then
      		token = body.sub(body, token+28)
      		tokenEnd = token.find(token, "\">")
      		csrfToken = token.sub(token, 1, tokenEnd-1)  
      		wrk.body= "csrfmiddlewaretoken=" .. csrfToken
      		cookie = headers["Set-Cookie"]
      		cookieEnd = cookie.find(cookie, ";");
      		cookie = cookie.sub(cookie, 1, cookieEnd-1)
      		wrk.headers["Cookie"] = cookie
      	end
   end
end

