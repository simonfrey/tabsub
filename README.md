# TabSub
## Offline Javascript PubSub between browser tabs

TabSub offers you an easy to use Javascript PubSub via local storage. No server is required as all messages are shared via the browser built in local storage.

Give the example a try to see what you can build with TabSub.

Is this safe for a lot of concurrent writes? To be honest I have no clue. I tried to break it with 10 concurrent writers and everything worked as expected: No message got lost and the messages where in correct order. No warranty here, use at your own risk 😅

As TabSub uses local store this only works on the same domain, as the browser separates the local storage by domains as security measure.

TabSub is licensed [MIT](https://github.com/simonfrey/tabsub/blob/master/LICENSE)

## Example

To checkout TabSub in action visit [simon-frey.com/tabsub](https://simon-frey.com/tabsub)

## Usage

### Including the script

```html
<script src="https://simon-frey.com/tabsub/tabsub.v1.min.js" integrity="sha384-WhqYceisw/e1nVVrHA5CI/Lt/c3HrNIZLtPE+sWky3NjzRAF6kt9Ivjp8LwoIS/k"></script>
```

### Initialization

```javascript
const ts = new TabSub();
```

### Available functions

#### publish(topic,msg)

Publish new message. The message can be of any type. Your callback in subscribe has to handle it correctly. TabSub does not take care about that.

```javascript
ts.publish("hello","world");
```

#### subscribe(topic, callback)

Register new listener. Callback is called with the message content if new message arrives

```javascript
ts.subscribe("hello",(msg)=>{
    console.log("Got msg: ",msg);
});
```

#### state(topic)
Get the current (static) state of a topic. Returns the current data in the local storage for this topic

```javascript
const state = ts.state("hello");
console.log("Current state: ",msg);
```