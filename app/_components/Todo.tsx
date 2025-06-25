"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

type Task = {
  id: number;
  title: string;
  time: string;
  date: number;
  month: number;
  year: number;
  completed: boolean;
};

export default function Todo() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newTime, setNewTime] = useState("");

  const calendarDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleAddTask = () => {
    if (newTask.trim() && newTime.trim()) {
      setTasks((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          title: newTask,
          time: newTime,
          date: selectedDate,
          month: currentMonth,
          year: currentYear,
          completed: false,
        },
      ]);
      setNewTask("");
      setNewTime("");
    }
  };

  const handleToggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-lg font-semibold">
                  {currentYear} - {currentMonth + 1}-р сар
                </h3>
                <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-2">
                {calendarDays.map((day) => (
                  <div key={day} className="py-2 font-medium">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from(
                  { length: getDaysInMonth(currentYear, currentMonth) },
                  (_, i) => i + 1
                ).map((date) => (
                  <Button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    size="sm"
                    variant={selectedDate === date ? "default" : "ghost"}
                    className={`h-10 w-10 p-0 text-sm font-medium ${
                      selectedDate === date
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {date}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Хийх зүйлс</h3>
              <div className="space-y-3">
                {tasks
                  .filter(
                    (task) =>
                      task.date === selectedDate &&
                      task.month === currentMonth &&
                      task.year === currentYear
                  )
                  .map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.id)}
                      />
                      <div className="flex-1 text-sm">
                        <p
                          className={`font-medium ${
                            task.completed
                              ? "line-through text-gray-400"
                              : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </p>
                      </div>
                      <Badge variant="secondary">{task.time}</Badge>
                    </div>
                  ))}
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" onClick={handleAddTask}>
                  <Plus className="w-4 h-4" />
                </Button>
                <Input
                  placeholder="Ажлын нэр"
                  className="flex-1"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <Input
                  placeholder="цаг : мин"
                  className="w-32"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
