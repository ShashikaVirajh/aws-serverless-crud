// const { CognitoJwtVerifier } = require("aws-jwt-verify");
// const COGNITO_USERPOOL_ID = process.env.COGNITO_USERPOOL_ID;
// const COGNITO_WEB_CLIENT_ID = process.env.COGNITO_WEB_CLIENT_ID;

// const jwtVerifier = CognitoJwtVerifier.create({
//   userPoolId: COGNITO_USERPOOL_ID,
//   tokenUse: "id",
//   clientId: COGNITO_WEB_CLIENT_ID
// })


const generatePolicy = (principalId, effect, resource) => {
    const authReponse = {};

    authReponse.principalId = principalId;
    if (effect && resource) {
      const policyDocument = {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: effect,
            Resource: resource,
            Action: "execute-api:Invoke",
          },
        ],
      };
      
      authReponse.policyDocument = policyDocument;
    }
    authReponse.context = {
        test: "test"
    }

    console.log(JSON.stringify(authReponse));
    return authReponse;
  };

exports.handler = async (event, _context, callback) => {
  const token = event.authorizationToken; // "allow" | "deny"
  
  switch(token) {
    case "allow":
        callback(null, generatePolicy("user", "Allow", event.methodArn));
        break;
    case "deny":
        callback(null, generatePolicy("user", "Deny", event.methodArn));
        break;
    default:
        callback("Error: Invalid token");
  }

  try {
    const payload = await jwtVerifier.verify(token);
    console.log(JSON.stringify(payload));

    return callback(null, generatePolicy("user", "Allow", event.methodArn));
  } catch(err) {
    return callback("Error: Invalid token..");
  }
};
