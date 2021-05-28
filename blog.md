---
layout: default
title: afk - blog
header: blogs, articles, projects
description: a collection of attempts of attempting to make stuff
permalink: /blog/
---

{% for post in site.posts %}
  <p><a href="{{ post.url }}">{{ post.title }}</a><br>
  {{ post.description }}<br>
  📅 {{ post.date | date_to_string }}</p>
{% endfor %}