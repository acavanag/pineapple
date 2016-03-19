var express = require('express');
var request = require('request');
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const map = { 'acavanag' : '@andrew' };

const slackUrl = 'https://slack.com/api/chat.postMessage';
const slackToken = process.env.SLACKTOKEN;

var performRequest = function(urlString) {
  request(urlString, function (error, response, body) {
    //kids, handle your errors.
  });
};

var postToUser = function(user, message, token) {
  const mappedUser = map[user];
  if (!mappedUser) { return; }
  const urlString = `${slackUrl}?token=${token}&channel=${mappedUser}&text=${message}`;
  performRequest(urlString);
};

app.post('/github', function (req, res) {
  const state = req.body.state;
  const commitUrl = req.body.commit.html_url;
  const commitMessage = req.body.commit.commit.message;
  const committer = req.body.commit.author.login;

  const slackMessage = `${state} -- ${commitUrl} : ${commitMessage}`;

  if (state && commitUrl && committer) {
    postToUser(committer, slackMessage, slackToken);
  }

  res.sendStatus(200);
});

app.listen(6544, function () {
  console.log('Pineapple listening on port 6544!');
});
