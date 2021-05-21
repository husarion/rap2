#!/bin/bash
sudo service ssh start
source /opt/ros/noetic/setup.sh
source /home/husarion/ros_workspace/devel/setup.sh
roslaunch /home/husarion/ros_workspace/src/rosbot_all.launch