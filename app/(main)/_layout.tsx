import {Tabs} from 'expo-router';
import {MaterialIcons} from '@expo/vector-icons';

export default function MainLayout() {
    return (
        <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="home" size={24} color={color}/>
                    ),
                    title: '首页'
                }}
            />
            <Tabs.Screen
                name="my"
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="person" size={24} color={color}/>
                    ),
                    title: '我的'
                }}
            />
            <Tabs.Screen
                name="upload"
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="cloud-upload" size={24} color={color}/>
                    ),
                    title: '上传'
                }}
            />
        </Tabs>
    );
}