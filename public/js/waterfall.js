(function($){
    $.fn.waterfall = function (json){
        //我希望我做的waterfall具有可复用性,该函数负责把一个容器中的所有子元素实现瀑布流布局
        var json = json||{};
        //获取相关DOM
        var container = $(this);//就是瀑布流的容器
        var items = container.children();//就是item的集合
        var width = container.width();//瀑布流容器的宽度
        var columnWidth = items.width();//就是item的宽度
        var column = json.column||5;
        //console.log(width)
        //console.log(columnWidth)
        var space = (width-column*columnWidth)/(column-1);
        var hSpace = json.hSpace||10;
        var columnHeightArray = [];//用于后期记录每一列的总高度
        //首行显示column张,后面添加的每一张都放在最短的那一列下面;
        items.each(function(index,obj){
            //obj是DOM元素,要包装一下
            var $obj = $(obj);
            if(index<column){
                //前面的column幅图直接水平排列
                $obj.css({top:0,left:index*(columnWidth+space)});
                columnHeightArray[index] = $obj.height();
            }else{
                //从第column幅图开始,每一幅图都排在列高最小的那一列
                var min = 0;
                for(var i=0;i<columnHeightArray.length;i++){
                    if(columnHeightArray[i]<columnHeightArray[min]){
                        min = i;
                    }
                }
                $obj.css({top:columnHeightArray[min]+hSpace,left:min*(columnWidth+space)});
                columnHeightArray[min] += $obj.height()+hSpace;
            }
        });
        //给容器设置一个高度,高度为列高最大值
        var max= Math.max.apply(null,columnHeightArray);
        container.css('height',max)
    };
})($)