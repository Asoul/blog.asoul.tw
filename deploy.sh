#!/bin/bash

set -e

hexo generate

firebase deploy
