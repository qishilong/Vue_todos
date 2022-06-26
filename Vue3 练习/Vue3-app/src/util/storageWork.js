const Local_Key = "todomvc";

// 生成一个任务的唯一编号, 时间戳 + 4位随机数
export function taskNumber () {
    return Date.now () + Math.random ()
                             .toString ( 16 )
                             .substr ( 2,
                                       4 );
}

// 获取目前所有任务
export function fetch () {
    const result = localStorage.getItem ( Local_Key );
    if ( result ) {
        return JSON.parse ( result );
    }
    return [];
}

// 保存所有任务
export function save ( todos ) {
    localStorage.setItem ( Local_Key,
                           JSON.stringify ( todos ) );
}

export function filter ( todos,
                         visibility = "all" ) {
    if ( visibility === "all" ) {
        return todos;
    } else if ( visibility === "active" ) {
        return todos.filter ( ( it ) => !it.completed );
    } else if ( visibility === "completed" ) {
        return todos.filter ( ( it ) => it.completed );
    }
    throw new Error ( "invalid value" );
}