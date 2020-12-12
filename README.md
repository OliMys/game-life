Вопрос 1
Дана доска размером M × N клеток. Клетка может находиться в одном из двух состояний: 1 — живая, 0 — мёртвая. Каждая клетка взаимодействует с восемью соседями. Правила таковы:
Живая клетка, у которой меньше двух живых соседей, погибает.
Живая клетка, у которой два или три живых соседа, выживает.
Живая клетка, у которой больше трёх живых соседей, погибает.
Мёртвая клетка, у которой три живых соседа, возрождается.
Напишите программу, которая будет:
— случайным образом генерить стартовое состояние;
— уметь получать его из файла (способ выбирается через параметры запуска в консоли);
— каждую секунду выводить в консоль новое состояние доски

Реализация:
Стартовое состояние генерируется любым из 3х способов:
1. при загрузке из файла с указанием пути к нему
2. при загрузке с указанием строк и столбцов, в этом случае программа создаст матрицу указанного размера и заполнит ее случайными значениями (1 или 0) (см.функцию рандома)
3. иначе будет создана матрица размером 20х20 и также заполнена случайными значениями.
При получении файла, его содержмое преобразуется в двумерный массив.

После создания матрицы каждый элемент преобразуется в объект с 2мя полями, где будут хранится состояния клетки - текущее и следующее.
Для того, чтобы результат не зависел от от того, в каком прядке выполняется подсчтет - 
после подсчета живых соседей, во время проверки условий задачи, каждой клетке присваивается ее будущее состояние (в поле nextState), после чего происходит обновление состояния.
Для того, чтобы результат был наглядным, создана функция, преобразующая массив в строку.

