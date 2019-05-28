# ZUL Digital Code Challenge

This code is supposed to resolve a Code Challenge.

## Specifications
Create an application that makes a request to their mock API with tweets and print the output of one of the tweets, respecting business rules: 
1. Randomly get the `text` attribute of one of the tweets at their mock API
1. Respect the limit of `45` characters to make the Tweet output
    1. If the text has more than `45` characters, the tweet needs to be sliced in N parts, untill the whole text has been presented

## API Mock
The API has 2 methods. One to make the authentication and get the JWT token with `60` seconds of duration, that needs to be used to make the request to the `timeline` endpoint. And the second one returns the timeline of tweets.

| | |
| --- | --- |
| **Base** URL | https://n8e480hh63o547stou3ycz5lwz0958.herokuapp.com/ |
| **Version** | 1.1 |

### Auth POST /{version}/auth

| Status Code | Description | Response |
| ----------- | --------- | ---------|
| 200 | Success authentication. | ```{ "token": "..." }``` |
| 500 | Unexpected error. |  |

### Timeline GET /{version}/statuses/home_timeline.json

| Status Code | Description | Response |
| ----------- | --------- | ---------|
| 200 | Get tweets list. | ```[{"created_at": "Wed Apr 11 22:15:17 +0000 2018" ... }]``` |
| 403 | Occur an error at the token validation. | ```{"message": "Invalid JWT token." }``` |
| 500 | Unexpected error. |  |


### Expected output

Supposing you're given the `Text` tweet, your application must output following the `Output` example.

| Text | Output |
| ---- | ------ |
| Interferência na Av. Washington Luis sentido Bairro, próximo Praça. Comte. Linneu Gomes. Ocupa uma faixa. #ZS. | Tweet #1: Interferência na Av. Washington Luis sentido | 
|  | Tweet #2: Bairro, próximo Praça. Comte. Linneu Gomes. |
|  | Tweet #3: Ocupa uma faixa. #ZS.

## Running the Code
Your code is supposed to run with the Docker Commands below:

```
docker build -t zuldigital/engineer-exam .

docker run --rm zuldigital/engineer-exam
```