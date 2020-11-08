#!/usr/bin/env python

import rospy
import math
from std_msgs.msg import Float32


def talker():
    pub = rospy.Publisher('/sensor1', Float32, tcp_nodelay=True, queue_size=1)
    rospy.init_node('talker', anonymous=True)
    rate = rospy.Rate(100)  # 10hz
    i = 0
    while not rospy.is_shutdown():
        data = Float32()
        data.data = math.sin(50 * i)
        pub.publish(data)
        i += 0.001
        rate.sleep()


if __name__ == '__main__':
    try:
        talker()
    except rospy.ROSInterruptException:
        pass
