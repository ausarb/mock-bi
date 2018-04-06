# mock-bi
Receive transcript messages from mock-ae.
Current implementation does nothing with these messages.

Reads transcript  messages from a Rabbit WORKER socket addressed as  _transcript_.
Discards them by doing nothing with them.

Assumes Rabbit URL is _amqp://rabbit:rabbit-amqp_

The expected message structure from __mock-ae__ is:
```
{
  "callId": 110013,
  "transcript": "random transcript"
}
```


## Build and Push
```
$ cd /home/doug/development/github/kubernetes
$ docker build --no-cache -t matr/mock-ae:1.2.3 mock-ti/_docker/boron
$ docker tag matr/mock-ti:1.2.3 matr/mock-ae:latest
$ docker push matr/mock-ae:1.2.3
$ docker push matr/mock-ae:latest
```

## Deploy
```
> cd c:/users/matr00659/development/github/kubernetes
> kubectl -f mock-ae/_k8s/service.yml
> kubectl -f mock-ae/_k8a/deployment.yml
```
