// 修改 删除

import {
    computed,
    ref
} from "vue";

export default function useEditTodo ( todosRef ) {
    const modifying = ref ( null ); // 当前正在修改的是哪一个 todo
    let originTitle = null; // 保存之前的 title 值
    
    const modifyTodo = ( todo ) => {
        originTitle = todo.title;
        modifying.value = todo;
    };
    
    const endModify = ( todo ) => {
        modifying.value = null;
        const title = todo.title.trim ();
        if ( title ) {
            todo.title = title;
        } else {
            // 删除
            const index = todosRef.value.indexOf ( todo );
            if ( index >= 0 ) {
                todosRef.value.splice ( index,
                                        1 );
            }
        }
    };
    const cancelModify = ( todo ) => {
        modifying.value = null;
        todo.title = originTitle;
    };
    
    const allCompleted = computed ( {
                                        get () {
                                            return todosRef.value.filter ( ( it ) => !it.completed ).length === 0;
                                        },
                                        set ( checked ) {
                                            todosRef.value.forEach ( ( todo ) => {
                                                todo.completed = checked;
                                            } );
                                        }
                                    } );
    return {
        modifyTodo,
        endModify,
        cancelModify,
        allCompleted,
        modifying
    };
}